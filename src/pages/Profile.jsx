import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = localStorage.getItem('user');
  let fallbackUser = null;
  try {
    fallbackUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    fallbackUser = null;
  }
  const user = reduxUser || fallbackUser;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <main className="page-section">
      <div className="container">
        <section className="profile-card card">
          <div className="profile-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>

          <div className="profile-content">
            <h1 className="heading">{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone || 'Phone not provided'}</p>

            <div className="profile-links">
              <Link className="btn btn-outline" to="/bookings">
                My Trips
              </Link>
              <Link className="btn btn-outline" to="/cars">
                Browse Cars
              </Link>
            </div>

            <button type="button" className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
