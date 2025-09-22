import React from "react";
import Banner1 from "../images/Banner-1.jpg";
import Banner2 from "../images/Banner-2.jpg";
import Banner3 from "../images/Banner-3.png";
import HomeBottom from "../components/HomeBottom";

export default function Home() {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src={Banner1} alt="First slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={Banner2} alt="Second slide" />
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={Banner3} alt="Third slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <br></br>
      <div style={{width: "100%", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
      <HomeBottom/>
      </div>
    </div>
      
  );
}
