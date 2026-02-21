import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelBooking,
  clearBookingError,
  fetchMyBookings
} from '../store/slices/bookingSlice';
import BookingCard from '../components/BookingCard';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import './MyBookings.css';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  const [busyId, setBusyId] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error]);

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [bookings]
  );

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) {
      return;
    }

    setBusyId(bookingId);
    const result = await dispatch(cancelBooking(bookingId));
    setBusyId('');

    if (cancelBooking.fulfilled.match(result)) {
      setToast({ message: 'Booking cancelled successfully.', type: 'success' });
    }
  };

  return (
    <main className="page-section">
      <div className="container">
        <div className="bookings-head">
          <h1 className="heading">My Bookings</h1>
          <Link className="btn btn-outline" to="/cars">
            Browse Cars
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : sortedBookings.length > 0 ? (
          <div className="bookings-list">
            {sortedBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
                processing={busyId === booking._id}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <h3>No bookings yet</h3>
            <p>Once you reserve a car, your trips will appear here.</p>
            <Link className="btn" to="/cars">
              Explore Cars
            </Link>
          </div>
        )}
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

export default MyBookings;
