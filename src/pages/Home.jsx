import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../store/slices/carSlice';
import CarCard from '../components/CarCard';
import Spinner from '../components/Spinner';
import './Home.css';

const features = [
  {
    title: 'Instant Booking',
    text: 'Book your preferred car in seconds with transparent pricing and instant confirmation.'
  },
  {
    title: 'Insured',
    text: 'Every SmartMove rental includes verified insurance coverage and safety checks.'
  },
  {
    title: 'Best Price',
    text: 'Competitive rates across categories, from city hatchbacks to premium luxury rides.'
  },
  {
    title: 'Roadside Assist',
    text: '24/7 support team ready to assist whenever your trip needs help.'
  }
];

const Home = () => {
  const dispatch = useDispatch();
  const { cars, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <main>
      <section className="home-hero page-section">
        <div className="container home-hero-grid">
          <div>
            <p className="hero-kicker">Built for effortless journeys</p>
            <h1 className="heading">Drive your city your way, with SmartMove.</h1>
            <p>
              Discover premium rentals, book instantly, and hit the road with confidence. SmartMove
              blends speed, safety, and style for every trip.
            </p>
            <div className="hero-actions">
              <Link to="/cars" className="btn">
                Browse Cars
              </Link>
              <Link to="/register" className="btn btn-outline">
                Start Free
              </Link>
            </div>
          </div>
          <div className="hero-card card">
            <h3 className="heading">Why riders choose SmartMove</h3>
            <ul>
              <li>Curated fleet across hatchback, SUV, luxury and EV categories</li>
              <li>Real-time availability and secure booking flow</li>
              <li>Transparent pricing and no hidden platform fees</li>
              <li>Dedicated support throughout your rental journey</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <h2 className="heading">Why SmartMove?</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card card">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-head">
            <h2 className="heading">Available Now</h2>
            <Link to="/cars" className="view-all-link">
              View all cars
            </Link>
          </div>

          {loading ? (
            <div className="available-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton skeleton-card" />
              ))}
            </div>
          ) : cars.length > 0 ? (
            <div className="available-grid">
              {cars.slice(0, 6).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="cta-banner card">
            <div>
              <h2 className="heading">Plan your next drive today.</h2>
              <p>Pick a car, choose your dates, and book in under a minute.</p>
            </div>
            <Link to="/cars" className="btn">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} SmartMove. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
