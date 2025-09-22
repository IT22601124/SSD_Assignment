import React, { useEffect, useState } from "react";

export default function Orders() {

  useEffect(()=>{
    //get orders
  }, []);

  return (
    <div>
      <br></br>
      <h4>My Orders</h4>
      <hr></hr>
      <div>
        <div className="card mb-3" style={{marginLeft: "10%", marginRight: "10%", borderRadius: "10px"}}>
          <div className="row g-0">
            <div className="col-md-4" >
              <img src="https://picsum.photos/400/200" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Prodcut Name</h5>
                <p className="card-text" style={{display: "inline"}}>
                  Quantity - 
                </p>
                <p className="card-text" style={{display: "initial"}}>
                  - Total Price
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Buyer's Name - 
                  </small>
                  <small className="text-body-secondary">
                    - Orderd Time and Date
                  </small>
                </p>
                <div style={{float: 'right'}}>
                    <label>Status - </label>
                    <label> - Approved</label>
                </div>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
