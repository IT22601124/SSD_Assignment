import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function AllProducts() {
    const [product, setProduct] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    
    function deleteProduct(id){
      const ans = window.confirm("Are you sure ?");
      if(ans){
        axios.delete(`http://localhost:8002/product/delete/${id}`)
        .then(()=>{
          window.alert("Product Deleted !")
          setDeleted(true);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    };

    function addToCart(item){

      const userID = user.user._id;
      const productID = item._id;
      const productName = item.name;
      const price = item.price;
      const image = item.imageLink;

      const cartItem = {userID, productID, productName, price, image};
      
      axios.post('http://localhost:8002/cart/add', cartItem)
      .then(()=>{
        window.alert('Item Added To Cart !');
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    useEffect(()=>{
        function getAllProducts(){
            axios.get("http://localhost:8002/product/get")
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getAllProducts();
        setDeleted(false);
    },[deleted] );

  return (
    <div>
    <br></br>
    <h2 style={{display: "inline-block", marginLeft: "2%",  display: "inline"}}>All Products</h2>
   
      {(user && user.user.type == 'seller') && (
        <div style={{display: "inline"}}>
          <Link to={`/addProduct`}><button className="btn btn-success" style={{display: "inline-block", float: "right", marginRight: '10px'}}>Add New Product</button> </Link> 
          <Link to={`/sellerProducts`}><button className="btn btn-warning" style={{display: "inline-block", float: "right", marginRight: '10px'}}>Manage My Products</button> </Link> 
        </div>
      )}
   
    <br/>
    <hr></hr>
    <div>
        {product.map((productData) => (
            <div className="card" style={{display: "inline-flex", margin: "20px", maxWidth: "300px"}} key={productData._id}>
            <div className="card-img-top" style={{width: "300px", height: "200px", objectFit: "cover"}}> 
              <img src={productData.imageLink} style={{width: "300px"}}/>
            </div> 
            <div className="card-body">
              <h5 className="card-title">{productData.name}</h5>
              {/* <p className="card-text">{productData.description}</p> */}
              <p className="card-text" style={{color: "darkGreen"}}>Rs : {productData.price}.00</p>
              <Link to={`/oneProduct/${productData._id}`}><button className="btn btn-info btn-sm">See Details</button> </Link> 
              {(user && user.user.type == 'admin') && (<Link to={`/editProduct/${productData._id}`}><button className="btn btn-warning btn-sm">Edit</button></Link>)}
              {(user && user.user.type == 'admin') && (<button style={{marginLeft: "5px"}} onClick={() => deleteProduct(productData._id)} className="btn btn-danger btn-sm">Delete</button>)}
              {((user && user.user.type == 'buyer') && <button onClick={() => addToCart(productData)} className="btn btn-success btn-sm">Add To Cart</button>)}
              {((user && user.user.type == 'buyer') && <button className="btn btn-warning btn-sm" style={{marginTop: "5px"}}>Add Review</button>)}
            </div>
          </div>
        ))}
    </div> 
    </div>
  );
}
