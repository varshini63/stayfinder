import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };
  return (
    <div className="form-container">
      <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>Login to StayFinder</h2>
      {error && (
        <div style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{width: '100%'}}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '1rem'}}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
export default Login;