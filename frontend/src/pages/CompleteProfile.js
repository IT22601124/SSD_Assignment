import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    type: ''
  });
  const [pendingUser, setPendingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    // Get pending user data
    const fetchPendingUser = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/pending-user', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setPendingUser(data.user);
          setFormData({
            firstname: data.user.firstname || '',
            lastname: data.user.lastname || '',
            mobilenumber: '',
            type: ''
          });
        } else {
          // No pending user, redirect to login
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch pending user:', err);
        navigate('/login');
      }
    };

    fetchPendingUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(data));
        
        // Update auth context
        dispatch({ type: 'LOGIN', payload: data });

        // Navigate based on user type
        if (data.user.type === 'buyer') {
          navigate('/buyer');
        } else if (data.user.type === 'seller') {
          navigate('/seller');
        } else if (data.user.type === 'admin') {
          navigate('/admin');
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to complete profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingUser) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '400px',
        maxWidth: '90%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2>Complete Your Profile</h2>
          <p>Welcome {pendingUser.email}! Please complete your profile to continue.</p>
          {pendingUser.picture && (
            <img 
              src={pendingUser.picture} 
              alt="Profile" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%',
                margin: '10px 0'
              }} 
            />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Last Name *
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Account Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            >
              <option value="">Select Account Type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <div style={{ 
              color: 'red', 
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#ffe6e6',
              border: '1px solid #ffcccc',
              borderRadius: '5px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#cccccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Completing Profile...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;