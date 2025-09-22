import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AddReview() {
    const productID = useParams();
    const [product, setProduct] = useState('');

    useEffect(()=>{
        axios.get(`http://localhost:8000/product/${productID}`)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    function saveReview(){

    }


  return (
    <div>
        <br/>
        <h3 style={{marginLeft: "2%"}}>Add Review For {product.name}</h3>
        <hr/>
        <br/>

        <div className="row md-10">
          <div className="col-md-10">
            <label className="labels" style={{ float: "left" }}>
              Enter Review :
            </label>
            <textarea
              type="text"
              className="form-control"
              required
            />
          </div>
        </div>
    </div>
  )
}
