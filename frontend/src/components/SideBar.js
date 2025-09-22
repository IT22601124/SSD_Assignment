import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {

  const liStyle = {
    padding: "10px",
    color : "green",
  }

  return (
    <div>
      <ul style={{marginTop: "20%", listStyleType: "none"}}>
        <Link to='/allProducts'><li cla style={liStyle}>All Products</li></Link> 
        <Link to='/oneCategory/cream'><li style={liStyle}>Creams</li></Link>
        <Link to='/oneCategory/soap'><li style={liStyle}>Soaps</li></Link>
        <Link to='/oneCategory/shampoo'><li style={liStyle}>Shampoo</li></Link> 
        <Link to='/oneCategory/oil'> <li style={liStyle}>Oils</li></Link> 
        <Link to='/oneCategory/weight gainer'><li style={liStyle}>Weight Gainers</li></Link> 
        <Link to='/oneCategory/vitamin'><li style={liStyle}>Vitamins</li></Link> 
      </ul>
    </div>
  );
}
