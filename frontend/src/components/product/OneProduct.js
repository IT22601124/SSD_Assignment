import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function OneProduct() {

    const user1 = JSON.parse(localStorage.getItem('user'));

    const {id} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        function getOncCream(){
            axios.get(`http://localhost:8002/product/getOne/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getOncCream();
    },[])


  return (
    <div> 
       <table style={{marginTop: "6%", fontSize: "16px", display: "inline-block", textAlign:"left", maxWidth: "50%"}}>
        <tr style={{height: "50px"}}>
            <th style={{width: "200px"}}>Name : </th>
            <td>{product.name}</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Description : </th>
            <td>{product.description}</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Price : </th>
            <td>Rs. {product.price}.00</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Quantity : </th>
            <td>{product.quantity} Items</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Weight : </th>
            <td>{product.weight} g</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Cagetory : </th>
            <td>{product.category}</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Sub Cagetory : </th>
            <td>{product.subCategory}</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Manufactured Date : </th>
            <td>{new Date(product.mfd).toLocaleDateString()}</td>
        </tr>
        <tr style={{height: "50px"}}>
            <th>Expiry Date : </th>
            <td>{new Date(product.exp).toLocaleDateString()}</td>
        </tr>
        <br/>
        <div>
        {(user1 && user1.user.type == 'buyer') && (
            <div>
                <button className='btn btn-success'>Add To Cart</button>
            </div>
        )}
        </div>
       </table>

       <div style={{display: "inline-block" ,float: 'left', marginLeft: "5%", marginTop: "10%", maxWidth: "30%", marginRight: "5%"}}>
        <img src={product.imageLink} style={{width: "350px", borderRadius: "10px"}}/>
       </div>

       <div>
        
       </div>
    </div>
  )
}

