import { Link } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <article className="car-card card">
      <div className="car-card-media">
        <img src={car.image || 'https://via.placeholder.com/400x250'} alt={car.name} />
        {!car.available && <span className="car-unavailable">Unavailable</span>}
      </div>
      <div className="car-card-body">
        <h3>{car.name}</h3>
        <p>{car.brand}</p>
        <div className="car-meta">
          <span>{car.type}</span>
          <span>{car.fuel}</span>
          <span>{car.seats} seats</span>
        </div>
        <div className="car-card-footer">
          <strong>
            <span>&#8377;</span>
            {car.pricePerDay}/day
          </strong>
          <Link className="btn" to={`/cars/${car._id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
