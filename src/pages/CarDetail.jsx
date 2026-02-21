import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarById } from '../store/slices/carSlice';
import {
  clearBookingError,
  clearBookingSuccess,
  createBooking
} from '../store/slices/bookingSlice';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import './CarDetail.css';

const oneDay = 1000 * 60 * 60 * 24;

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { car, loading } = useSelector((state) => state.cars);
  const { loading: bookingLoading, error, success } = useSelector((state) => state.bookings);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    dispatch(fetchCarById(id));
    dispatch(clearBookingSuccess());
    dispatch(clearBookingError());
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      setToast({ message: 'Booking confirmed successfully!', type: 'success' });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  const bookingSummary = useMemo(() => {
    if (!startDate || !endDate || !car) {
      return { days: 0, total: 0 };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return { days: 0, total: 0 };
    }

    const days = Math.ceil((end - start) / oneDay);
    return {
      days,
      total: days * car.pricePerDay
    };
  }, [startDate, endDate, car]);

  const handleBook = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      setToast({ message: 'Please select start and end dates', type: 'error' });
      return;
    }

    await dispatch(
      createBooking({
        carId: id,
        startDate,
        endDate
      })
    );
  };

  if (loading || !car) {
    return (
      <main className="page-section">
        <div className="container">
          <Spinner />
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="page-section">
        <div className="container">
          <div className="booking-success card">
            <h2 className="heading">Booking Confirmed</h2>
            <p>
              Your reservation for <strong>{car.name}</strong> has been created. You can manage it from
              My Bookings.
            </p>
            <div className="success-actions">
              <Link className="btn" to="/bookings">
                Go to My Bookings
              </Link>
              <Link className="btn btn-outline" to="/cars">
                Book Another Car
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="car-detail-page page-section">
      <div className="container car-detail-grid">
        <section className="car-detail-info card">
          <img src={car.image || 'https://via.placeholder.com/1200x700'} alt={car.name} />

          <div className="car-detail-content">
            <h1 className="heading">{car.name}</h1>
            <p className="car-brand">{car.brand}</p>

            <div className="spec-grid">
              <div>
                <small>Type</small>
                <span>{car.type}</span>
              </div>
              <div>
                <small>Fuel</small>
                <span>{car.fuel}</span>
              </div>
              <div>
                <small>Seats</small>
                <span>{car.seats}</span>
              </div>
              <div>
                <small>Location</small>
                <span>{car.location || 'N/A'}</span>
              </div>
            </div>

            <h3>About this car</h3>
            <p>{car.description || 'No description available.'}</p>
          </div>
        </section>

        <aside className="booking-card-panel card">
          <h3 className="heading">Book this car</h3>
          <p className="price-tag">
            ₹{car.pricePerDay} <span>/ day</span>
          </p>

          {!car.available ? (
            <div className="unavailable-box">
              <strong>Currently Unavailable</strong>
              <p>This car is not available at the moment. Please check another option.</p>
            </div>
          ) : (
            <form onSubmit={handleBook}>
              <label>
                Start Date
                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>

              <label>
                End Date
                <input
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </label>

              <div className="price-breakdown">
                <div>
                  <span>Duration</span>
                  <strong>{bookingSummary.days || 0} days</strong>
                </div>
                <div>
                  <span>Total</span>
                  <strong>₹{bookingSummary.total || 0}</strong>
                </div>
              </div>

              <button type="submit" className="btn full" disabled={bookingLoading}>
                {bookingLoading ? 'Processing...' : 'Book Now'}
              </button>
            </form>
          )}
        </aside>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => {
          setToast({ message: '', type: 'success' });
          dispatch(clearBookingError());
        }}
      />
    </main>
  );
};

export default CarDetail;
