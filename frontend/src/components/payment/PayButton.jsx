import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../slices/api";
import React, { Component }  from 'react';

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          try {
            const target = new URL(response.data.url, window.location.origin);

            // Allow only same-origin or whitelisted domains
            const allowedHosts = ["localhost:3000", "127.0.0.1:3000", "checkout.stripe.com"];
            if (target.origin === window.location.origin || allowedHosts.includes(target.hostname)) {
              window.location.href = target.href; // safe
            } else {
              console.error("Blocked unsafe redirect:", target.href);
            }
          } catch (e) {
            console.error("Invalid redirect URL:", response.data.url);
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
