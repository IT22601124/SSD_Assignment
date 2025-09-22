import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SellerProducts() {
    const user1 = JSON.parse(localStorage.getItem('user'));
    const sellerID = user1.user._id;

    const [product, setProduct] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    useState(()=>{
        axios.get(`http://localhost:8002/product/seller/${sellerID}`)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        setIsDeleted(false);
    }, [isDeleted]);

    function deleteProduct(id){
        const response = window.confirm('Are you sure ?');
        if(response){
            axios.delete(`http://localhost:8002/product/delete/${id}`)
            .then(()=>{
              window.alert("Product Deleted !")
              setIsDeleted(true);
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    }

  return (
    <div>
        <br/>
        <h2 style={{marginLeft: "2%"}}>My Products</h2>
        <hr/>
        <br/>

        <div>
            {product.map((productData) => (
                <div className="card" style={{display: "inline-flex", margin: "20px", maxWidth: "300px"}} key={productData._id}>
                <div className="card-img-top"> 
                <img src={productData.imageLink} style={{width: "300px"}}/>
                </div> 
                <div className="card-body">
                <h5 className="card-title">{productData.name}</h5>
                {/* <p className="card-text">{productData.description}</p> */}
                <p className="card-text" style={{color: "darkGreen"}}>Rs : {productData.price}.00</p>
                <Link to={`/oneProduct/${productData._id}`}><button className="btn btn-info btn-sm">See Details</button> </Link> 
                {(user1.user.type == 'seller' || user1.user.type == 'admin') && (<Link to={`/editProduct/${productData._id}`}><button className="btn btn-warning btn-sm">Edit</button></Link>)}
                {(user1.user.type == 'seller' || user1.user.type == 'admin') && (<button style={{marginLeft: "5px"}} onClick={() => deleteProduct(productData._id)} className="btn btn-danger btn-sm">Delete</button>)}
                </div>
            </div>
            ))}
        </div> 
    </div>
  )
}
