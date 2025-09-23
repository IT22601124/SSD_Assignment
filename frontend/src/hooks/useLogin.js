import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      //save user local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);

      console.log(json)
      if(json.user.type === 'buyer'){
        navigate('/buyer');
      }
      else if(json.user.type === 'seller'){
        navigate('/seller');
      }
      else if(json.user.type === 'admin'){
        navigate('/admin');
      }
    }
  };

  const googleLogin = () => {
    setIsLoading(true);
    setError(null);
    window.location.href = 'http://localhost:4000/auth/login';
  };

  const checkGoogleAuth = async (authKey = null) => {
    try {
      console.log('checkGoogleAuth: Starting authentication check...', authKey ? `with key: ${authKey}` : 'with session');
      
      let response;
      if (authKey) {
        response = await fetch(`http://localhost:4000/auth/auth-result/${authKey}`, {
          credentials: 'include'
        });
        console.log('checkGoogleAuth: Auth key response status:', response.status);
      }
      if (!authKey || !response || !response.ok) {
        response = await fetch('http://localhost:4000/auth/profile', {
          credentials: 'include'
        });
        console.log('checkGoogleAuth: Session response status:', response.status);
      }
      
      console.log('checkGoogleAuth: Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('checkGoogleAuth: Response data:', data);
        
        if (data.authenticated) {
          const userObj = {
            user: {
              _id: data.user._id,
              email: data.user.email,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              type: data.user.type,
              picture: data.user.picture,
              isGoogleUser: data.user.isGoogleUser
            },
            token: data.user.token
          };

          console.log('checkGoogleAuth: Created user object:', userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
          dispatch({ type: "LOGIN", payload: userObj });
          
          setIsLoading(false);
        
          if (userObj.user.type === 'buyer') {
            navigate('/buyer');
          } else if (userObj.user.type === 'seller') {
            navigate('/seller');
          } else if (userObj.user.type === 'admin') {
            navigate('/admin');
          }
          
          return true;
        } else {
          console.log('checkGoogleAuth: User not authenticated');
        }
      } else {
        const errorText = await response.text();
        console.log('checkGoogleAuth: Response not ok, error:', errorText);
      }
      
      setIsLoading(false);
      setError('Google authentication failed - no valid session');
      return false;
    } catch (err) {
      console.error('checkGoogleAuth: Error caught:', err);
      setError('Google authentication failed: ' + err.message);
      setIsLoading(false);
      return false;
    }
  };

  return { login, googleLogin, checkGoogleAuth, isLoading, error };
};
