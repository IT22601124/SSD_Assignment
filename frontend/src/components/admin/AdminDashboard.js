import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function AdminDashboard() {

  const {user} = useAuthContext()
  
  return (
    <div>
    <br></br>
      <h3>Administrator's Dashboard</h3>
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div className="col bg-light" style={{padding: "50px", borderRadius: "50px", margin: "5px"}}>
            <h4>Personal Details</h4>
            <br></br>
            <div style={{textAlign: "left"}}>
                Name : <input style={{width: "100%"}}>Hi</input> <br></br>
                Email : <input style={{width: "100%"}}></input> <br></br>
                Mobile : <input style={{width: "100%"}}></input> <br></br>
                Birthdate : <input style={{width: "100%"}}></input> <br></br> 
                <button type="button" className="btn btn-warning">Update Details</button>
            </div>
            
          </div>

          <div className="col bg-light" style={{padding: "50px", borderRadius: "50px", margin: "5px"}}>
          <h4>Management</h4>
            <br></br>
            <Link to={'/buyerReqests'}><button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>View Buyer Reqests</button></Link> 
            <button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>View Sellers Details</button><br></br>
            <button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>Manage Products</button>
            <button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>View Reports</button>
          </div>

          <div className="col bg-light" style={{padding: "50px", borderRadius: "50px", margin: "5px"}}>
            <h4>Notifications</h4>
            <br></br>
            <p>TEXT</p>
            <p>TEXT</p>
            <p>TEXT</p>
            <p>TEXT</p>
          </div>
        </div>
      </div>
    </div>
  );
}
