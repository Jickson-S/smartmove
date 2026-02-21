import './BookingCard.css';

const BookingCard = ({ booking, onCancel, processing }) => {
  const canCancel = booking.status === 'pending';

  return (
    <article className="booking-card card">
      <img src={booking.car?.image || 'https://via.placeholder.com/400x250'} alt={booking.car?.name} />

      <div className="booking-card-content">
        <div className="booking-card-head">
          <div>
            <h3>{booking.car?.name || 'Car not available'}</h3>
            <p>
              {new Date(booking.startDate).toLocaleDateString()} -{' '}
              {new Date(booking.endDate).toLocaleDateString()}
            </p>
          </div>
          <span className={`status-pill status-${booking.status}`}>{booking.status}</span>
        </div>

        <div className="booking-info-grid">
          <div>
            <small>Booking ID</small>
            <strong>{booking._id}</strong>
          </div>
          <div>
            <small>Total Amount</small>
            <strong>&#8377;{booking.totalPrice}</strong>
          </div>
        </div>

        {canCancel && (
          <button
            type="button"
            className="btn btn-outline"
            disabled={processing}
            onClick={() => onCancel(booking._id)}
          >
            {processing ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        )}
      </div>
    </article>
  );
};

export default BookingCard;
