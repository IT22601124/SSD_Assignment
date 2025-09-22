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

    //console.log(json.user);
  };

  return { login, isLoading, error };
};
