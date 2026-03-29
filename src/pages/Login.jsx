import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import FormInput from '../components/FormInput';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const USERS_STORAGE_KEY = 'edulearn_users';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Debug: Check localStorage on component mount
  useEffect(() => {
    console.log('🔧 Login component mounted');
    const users = loadFromStorage(USERS_STORAGE_KEY, []);
    console.log('📊 Current localStorage users:', users.length, 'users');
  }, []);

  // Mock users for demo purposes
  const mockUsers = [
    { id: 1, email: 'admin@edulearn.com', password: 'admin123', name: 'Admin User', role: 'admin' },
    { id: 2, email: 'student@edulearn.com', password: 'student123', name: 'John Doe', role: 'student' },
    { id: 3, email: 'teacher@edulearn.com', password: 'teacher123', name: 'Jane Smith', role: 'teacher' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Check against stored users first
    const storedUsers = loadFromStorage(USERS_STORAGE_KEY, []);
    let user = storedUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password);

    // If not found in stored users, check against mock users
    if (!user) {
      user = mockUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password);
    }

    if (user) {
      // Save user session using AuthContext
      const userSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        loggedInAt: new Date().toISOString()
      };

      login(userSession);
      setLoading(false);

      // Navigation will be handled by useEffect when auth state updates
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <LogIn size={32} />
            <h1>Welcome Back</h1>
            <p>Sign in to your EduLearn account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="form-error-message">{error}</div>}

            <FormInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required={true}
            />

            <div className="form-group">
              <label>
                Password
                <span className="required">*</span>
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <div className="demo-accounts">
              <h4>Demo Accounts:</h4>
              <div className="demo-account">
                <strong>Admin:</strong> admin@edulearn.com / admin123
              </div>
              <div className="demo-account">
                <strong>Student:</strong> student@edulearn.com / student123
              </div>
              <div className="demo-account">
                <strong>Teacher:</strong> teacher@edulearn.com / teacher123
              </div>
            </div>
            <div className="debug-info" style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '6px', fontSize: '0.8rem' }}>
              <strong>Debug Info:</strong><br/>
              Stored Users: {loadFromStorage(USERS_STORAGE_KEY, []).length}<br/>
              <button onClick={() => { localStorage.removeItem(USERS_STORAGE_KEY); window.location.reload(); }} style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>
                Clear All Users
              </button>
              <button onClick={() => { console.log('Current users:', loadFromStorage(USERS_STORAGE_KEY, [])); alert('Check console for user data'); }} style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                Show Users in Console
              </button>
            </div>
            <div className="signup-link">
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}