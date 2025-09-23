import React, { useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
  const { checkGoogleAuth, isLoading, error } = useLogin();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authKey = searchParams.get('key');
    console.log('OAuthCallback: Auth key from URL:', authKey);
    
    // Add a small delay to ensure session is properly saved
    const timer = setTimeout(() => {
      checkGoogleAuth(authKey);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column' 
      }}>
        <div>Completing Google login...</div>
        <div style={{ marginTop: '10px' }}>Please wait...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column' 
      }}>
        <div style={{ color: 'red' }}>Error: {error}</div>
        <div style={{ marginTop: '10px' }}>
          <a href="/login">Return to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <div>Processing authentication...</div>
    </div>
  );
};

export default OAuthCallback;