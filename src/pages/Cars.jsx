import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../store/slices/carSlice';
import FilterBar from '../components/FilterBar';
import CarCard from '../components/CarCard';
import './Cars.css';

const defaultFilters = {
  type: '',
  fuel: '',
  minPrice: '',
  maxPrice: ''
};

const Cars = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);

  const [filters, setFilters] = useState(defaultFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [dispatch, filters]);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const sortedCars = useMemo(() => {
    const searched = cars.filter((car) => {
      const haystack = `${car.name} ${car.brand}`.toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    });

    const list = [...searched];

    if (sortBy === 'priceAsc') {
      list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'priceDesc') {
      list.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [cars, searchTerm, sortBy]);

  return (
    <main className="cars-page page-section">
      <div className="container cars-layout">
        <FilterBar filters={filters} onFilterChange={setFilter} onReset={() => setFilters(defaultFilters)} />

        <section className="cars-content">
          <div className="cars-toolbar card">
            <input
              className="input"
              type="text"
              placeholder="Search by car name or brand"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <select className="input" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>

          {error && <p className="error-text">{error}</p>}

          {loading ? (
            <div className="cars-grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="skeleton skeleton-car" />
              ))}
            </div>
          ) : sortedCars.length > 0 ? (
            <div className="cars-grid">
              {sortedCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="empty-state card">
              <h3>No cars match your filters</h3>
              <p>Try clearing filters or broadening your search.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Cars;
