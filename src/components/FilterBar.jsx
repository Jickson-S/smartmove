import './FilterBar.css';

const carTypes = ['hatchback', 'sedan', 'suv', 'luxury', 'ev'];
const fuelTypes = ['petrol', 'diesel', 'electric'];

const FilterBar = ({ filters, onFilterChange, onReset }) => {
  return (
    <aside className="filter-panel card">
      <div className="filter-group">
        <h4>Car Type</h4>
        <div className="chip-grid">
          {carTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`chip ${filters.type === type ? 'active' : ''}`}
              onClick={() => onFilterChange('type', filters.type === type ? '' : type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Fuel Type</h4>
        <div className="chip-grid">
          {fuelTypes.map((fuel) => (
            <button
              key={fuel}
              type="button"
              className={`chip ${filters.fuel === fuel ? 'active' : ''}`}
              onClick={() => onFilterChange('fuel', filters.fuel === fuel ? '' : fuel)}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input
            type="number"
            className="input"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(event) => onFilterChange('minPrice', event.target.value)}
          />
          <input
            type="number"
            className="input"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(event) => onFilterChange('maxPrice', event.target.value)}
          />
        </div>
      </div>

      <button type="button" className="btn btn-outline" onClick={onReset}>
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterBar;
