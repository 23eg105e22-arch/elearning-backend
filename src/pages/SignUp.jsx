import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, CheckCircle } from 'lucide-react';
import FormInput from '../components/FormInput';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import '../styles/SignUp.css';

const USERS_STORAGE_KEY = 'edulearn_users';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }

    if (!formData.email) {
      setError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Check if user already exists
    const existingUsers = loadFromStorage(USERS_STORAGE_KEY, []);
    const userExists = existingUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

    if (userExists) {
      setError('An account with this email already exists');
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.toLowerCase(),
      password: formData.password, // In a real app, this would be hashed
      role: 'student', // Default role
      createdAt: new Date().toISOString()
    };

    console.log('🆕 Creating new user:', newUser);

    // Save user
    const updatedUsers = [...existingUsers, newUser];
    saveToStorage(USERS_STORAGE_KEY, updatedUsers);

    console.log('💾 All users after signup:', updatedUsers);

    // Verify the user was saved correctly
    const verifyUsers = loadFromStorage(USERS_STORAGE_KEY, []);
    const verifyUser = verifyUsers.find(u => u.email === newUser.email);
    console.log('✅ Verification - user saved:', verifyUser);

    setSuccess(true);
    setLoading(false);

    // Redirect to login after verification
    setTimeout(() => {
      console.log('🔄 Redirecting to login...');
      navigate('/login', { replace: true });
    }, 2500);
  };

  if (success) {
    return (
      <div className="signup-page">
        <div className="signup-container">
          <div className="success-card">
            <CheckCircle size={64} className="success-icon" />
            <h1>Account Created!</h1>
            <p>Your account has been successfully created. You will be redirected to the login page.</p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <UserPlus size={32} />
            <h1>Create Account</h1>
            <p>Join EduLearn and start your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {error && <div className="form-error-message">{error}</div>}

            <FormInput
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required={true}
            />

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
                  placeholder="Create a password (min. 6 characters)"
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

            <div className="form-group">
              <label>
                Confirm Password
                <span className="required">*</span>
              </label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg signup-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}