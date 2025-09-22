import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import storage from "../../firebase/firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8002/product/getOne/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [subCategory, setSubCategory] = useState(product.subCategory);
  const [mfd, setMfd] = useState(product.mfd);
  const [exp, setExp] = useState(product.exp);
  const [weight, setWeight] = useState(product.weight);
  const [imageLink, setImageLink] = useState(product.imageLink);

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  //Image upload file change handle
  function handleChange(event) {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageLink(url)
        });
      }
    );
  };


  function updateProduct(event) {
    event.preventDefault();

    const updated = {
        name, description, price, quantity, weight, mfd, exp, category, subCategory, imageLink
    }

    axios.patch(`http://localhost:8002/product/update/${id}`, updated)
    .then(()=>{
        window.alert("Product Updated !");
        navigate('/allProducts');
    })
    .catch((err)=>{
        console.log(err);
    })
  }
  return (
    <div style={{marginLeft: "10%", marginTop: "20px"}}>
      <br></br>
      <h3>Edit {product.name} </h3>
      <br></br>
      <div>
      <div className="row md-6">
          <div className="col-md-6">
          <label className="labels" style={{ float: "left" }}>
              Upload Image :
            </label>
            <input 
              type="file"
              class="form-control"  
              onChange={handleChange}   
            />
            <div style={{marginTop: "10px"}}>
              <button type="button" class="btn btn-secondary" onClick={handleUpload}>Upload</button>
              <p>{percent} "% done"</p>
            </div>
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-6">
            <label className="labels" style={{ float: "left" }}>
              Product Name 
            </label>
            <input
              type="text"
              className="form-control"
              required
              defaultValue={product.name}
              onChange={(event)=>{
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-6">
            <label className="labels" style={{ float: "left" }}>
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              required
              defaultValue={product.description}
              onChange={(event)=>{
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <br/>
      <div className="row md-6">
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Price (RS)
          </label>
          <input
            type="text"
            className="form-control"
            required
            defaultValue={product.price}
            onChange={(event)=>{
                setPrice(event.target.value);
              }}
          />
        </div>
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Category
          </label>
          <input
            type="text"
            className="form-control"
            required
            defaultValue={product.category}
            onChange={(event)=>{
                setCategory(event.target.value);
              }}
          />
        </div>
      </div>
      <div className="row md-6">
          <div className="col-md-6">
            <label className="labels" style={{ float: "left" }}>
              Sub Cagetory 
            </label>
            <input
              type="text"
              className="form-control"
              required
              defaultValue={product.subCategory}
              onChange={(event)=>{
                setSubCategory(event.target.value);
              }}
            />
          </div>
        </div>
      <div className="row md-6">
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Weight (g)
          </label>
          <input
            type="text"
            className="form-control"
            required
            defaultValue={product.weight}
            onChange={(event)=>{
                setWeight(event.target.value);
              }}
          />
        </div>
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Quantity
          </label>
          <input
            type="text"
            className="form-control"
            required
            defaultValue={product.quantity}
            onChange={(event)=>{
                setQuantity(event.target.value);
              }}
          />
        </div>
      </div>
      <div className="row md-6">
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Manufactured Date
          </label>
          <input
            type="date"
            className="form-control"
            required
            defaultValue={new Date(product.mfd).toLocaleDateString()}
            onChange={(event)=>{
                setMfd(event.target.value);
              }}
          />
        </div>
        <div className="col-md-3">
          <label className="labels" style={{ float: "left" }}>
            Expiry Date
          </label>
          <input
            type="date"
            className="form-control"
            required
            defaultValue={new Date(product.exp).toLocaleDateString()}
            onChange={(event)=>{
                setExp(event.target.value);
              }}
          />
        </div>
      </div>
      <div className="row md-6" style={{marginLeft: "1px", marginTop: "10px"}}>
        <button  className="btn btn-warning" type="button" onClick={updateProduct}>
          Update
        </button>
      </div>
    </div>
  );
}
