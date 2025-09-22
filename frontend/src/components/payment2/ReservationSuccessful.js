import "./ReservationSuccessful.css"; // Import custom CSS file for styling

import React from "react";

import { FaCheckCircle } from "react-icons/fa"

const ReservationSuccessful = () => {
  return (
    <>
            {" "}
      <div className="container">
             {" "}
        <div className="row">
                 {" "}
          <div className="col-md-6 offset-md-3">
                     {" "}
            <div className="card reservation-card">
                         {" "}
              <div className="card-body d-flex flex-column align-items-center">
                           {" "}
                <div className="icon-container">
                                  <FaCheckCircle className="checkmark-icon" /> 
                             {" "}
                </div>
                             {" "}
                <h2 className="reservation-heading">Reservation Successful</h2> 
                           {" "}
                <p className="reservation-message">
                                  Thank you for your reservation! Your booking
                  is confirmed.              {" "}
                </p>
                             {" "}
                <p className="reservation-details">
                                  Date: June 1, 2023                 <br />
                                  Time: 8:00 PM                 <br />         
                     {" "}
                </p>
                           {" "}
              </div>
                       {" "}
            </div>
                   {" "}
          </div>
               {" "}
        </div>
           {" "}
      </div>
         {" "}
    </>
  );
};

export default ReservationSuccessful;
