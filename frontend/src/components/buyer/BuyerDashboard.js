import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function BuyerDashboard() {
  //console.log(user);

  return (
    <div>
    <br></br>
      <h3>Buyer's Dashboard</h3>
      <hr></hr>
      <div className="container text-center">
        <div className="row">
          <div className="col bg-light" style={{padding: "50px", borderRadius: "50px", margin: "5px"}}>
            <h4>Personal Details</h4>
            <br></br>
            <div style={{textAlign: "left"}}>
                Name : <input style={{width: "100%"}}></input> <br></br><br></br>
                Email : <input style={{width: "100%"}}></input> <br></br><br></br>
                Mobile : <input style={{width: "100%"}}></input> <br></br><br></br>
                Birthdate : <input style={{width: "100%"}}></input> <br></br> <br></br>
                <button type="button" className="btn btn-warning">Update Details</button>
            </div>
            
          </div>

          <div className="col bg-light" style={{padding: "50px", borderRadius: "50px", margin: "5px"}}>
          <h4>Management</h4>
            <br></br>
            <Link to={'/orders'}><button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>View All Orders</button></Link> 
            <Link to={'/allCreams'}> <button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}>View Products</button></Link><br></br>
            {/* <button type="button" className="btn btn-info" style={{margin: "5px", width: "100%", height: "50px"}}></button> */}
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
