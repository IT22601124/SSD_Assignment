import React from "react";
import imageOne from "../images/giniraja.jpg";
import imageTwo from "../images/banyan.jpg";
import imageThree from "../images/brahmi.png";
import imageFour from "../images/disna.jpg";
import imageFive from "../images/women.jpg";
import imageSix from "../images/siddhaleepa.jpeg";

export default function HomeBottom() {
  return (
    <div>
    <h3 style={{textAlign: 'left', color: "darkgreen", fontWeight: 'bold'}}>Top Selling Items ✨cd ba</h3>
    <hr/>
    <br/>
    <div style={{display:"inline-flex"}}>  
    <div
      class="card"
      style={{
        width: "12rem",
        border: "1px solid black",
        borderRadius: "15px", marginRight:"15px",
        height: "250px"
      }}
    >
      <center>
        <img
          class="card-img-top"
          src={imageOne}
          alt="giniraja"
          style={{ width: "130px" }}
        />
        <div class="card-body">
          <h6 class="card-title" style={{ color: "Green" }}>
            Giniraja Herbal Oil
          </h6>
          <hp>Rs 5000.00</hp>
        </div>
      </center>
    </div>



    <div
      class="card"
      style={{
        width: "12rem",
        border: "1px solid black",
        borderRadius: "15px",
        marginRight:"15px",
        height: "250px"
      }}
    >
      <center>
        <img
          class="card-img-top"
          src={imageTwo}
          alt="giniraja"
          style={{ width: "130px" }}
        />
        <div class="card-body">
          <h6 class="card-title" style={{ color: "Green" }}>
            Banyan Body Cleanse
          </h6>
          <p>Rs 2000.00</p>
        </div>
      </center>
    </div>


    <div
      class="card"
      style={{
        width: "12rem",
        border: "1px solid black",
        borderRadius: "15px",
        marginRight:"15px",
        height: "250px"
      }}
    >
      <center>
        <img
          class="card-img-top"
          src={imageThree}
          alt="giniraja"
          style={{ width: "130px" }}
        />
        <div class="card-body">
          <h6 class="card-title" style={{ color: "Green" }}>
            Brahmi Memory Support
          </h6>
          <p>Rs 2500.00</p>
        </div>
      </center>
    </div>


    <div
      class="card"
      style={{
        width: "12rem",
        border: "1px solid black",
        borderRadius: "15px",
        marginRight:"15px",
        height: "250px"
      }}
    >
      <center>
        <img
          class="card-img-top"
          src={imageFour}
          alt="giniraja"
          style={{ width: "130px" }}
        />
        <div class="card-body">
          <h6 class="card-title" style={{ color: "Green" }}>
            Disna FacePack
          </h6>
          <p>Rs 1500.00</p>
        </div>
      </center>
    </div>



    <div
      class="card"
      style={{
        width: "12rem",
        border: "1px solid black",
        borderRadius: "15px",
        marginRight:"15px",
        height: "250px"
      }}
    >
      <center>
        <img
          class="card-img-top"
          src={imageFive}
          alt="giniraja"
          style={{ width: "130px" }}
        />
        <div class="card-body">
          <h6 class="card-title" style={{ color: "Green" }}>
            Brahmi Woman's Support
          </h6>
          <p>Rs 2000.00</p>
        </div>
      </center>
    </div>
  </div>
  </div>
  );
}