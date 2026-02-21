import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser } from '../store/slices/authSlice';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
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
    await dispatch(registerUser(form));
  };

  return (
    <main className="auth-page">
      <section className="auth-card card">
        <h1 className="heading">Create Account</h1>
        <p>Sign up and start booking your next drive instantly.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
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
          <input
            type="tel"
            className="input"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
