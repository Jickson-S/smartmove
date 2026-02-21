import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../store/slices/authSlice';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }

    return () => {
      dispatch(clearError());
    };
  }, [token, navigate, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser(form));
  };

  return (
    <main className="auth-page">
      <section className="auth-card card">
        <h1 className="heading">Welcome Back</h1>
        <p>Login to manage your bookings and profile.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          New to SmartMove? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
