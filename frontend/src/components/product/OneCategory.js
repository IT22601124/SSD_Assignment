import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function OneCategory() {
    const {category} = useParams();
    const [creams, setCreams] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        axios.get(`http://localhost:8002/product/category/${category}`)
        .then((res)=>{
          setCreams(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })
    },[category], [deleted]);

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

  return (
    <div>

      <br></br>
      <h2 style={{display: "inline-block", marginLeft: "2%",  display: "inline"}}>All {category}s</h2>

      {(user && user.user.type == 'seller') && (
        <div style={{display: "inline"}}>
          <Link to={`/addProduct`}><button className="btn btn-success" style={{display: "inline-block", float: "right", marginRight: '10px'}}>Add New Product</button> </Link> 
          <Link to={`/sellerProducts`}><button className="btn btn-warning" style={{display: "inline-block", float: "right", marginRight: '10px'}}>Manage My Products</button> </Link> 
        </div>
      )}
      <hr/>
        <div>
          {creams.map((creamData) => (
          <div className="card" style={{display: "inline-flex", margin: "20px", maxWidth: "300px"}} key={creamData._id}>
          <div className="card-img-top" style={{width: "300px", height: "200px", objectFit: "cover"}}> 
            <img src={creamData.imageLink} style={{width: "300px"}}/>
          </div> 
          <div className="card-body">
            <h5 className="card-title">{creamData.name}</h5>
            {/* <p className="card-text">{creamData.description}</p> */}
            <p className="card-text" style={{color: "darkGreen"}}>Rs : {creamData.price}.00</p>
            <Link to={`/oneProduct/${creamData._id}`}><button className="btn btn-info btn-sm">See Details</button> </Link> 
            {(user && user.user.type == 'admin') && (<Link to={`/editProduct/${creamData._id}`}><button className="btn btn-warning btn-sm">Edit</button></Link>)}
            {(user && user.user.type == 'admin') && (<button style={{marginLeft: "5px"}} onClick={() => deleteProduct(creamData._id)} className="btn btn-danger btn-sm">Delete</button>)}
            {((user && user.user.type == 'buyer') && <button className="btn btn-success btn-sm">Add To Cart</button>)}
            {((user && user.user.type == 'buyer') && <button className="btn btn-warning btn-sm" style={{marginTop: "5px"}}>Add Review</button>)}
          </div>
        </div>
      ))}
      {creams == '' && (
        <div style={{textAlign: "center", marginTop: "200px"}}>
          <h4>Sorry ! Currently No Products are Avaliable Under This Category</h4>
        </div>
      )}
    </div> 
  </div>
  )
}
