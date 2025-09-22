import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import storage from "../../firebase/firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddNewProduct() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const user1 = JSON.parse(localStorage.getItem('user'));
     
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setType] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mfd, setMfd] = useState("");
  const [exp, setExp] = useState("");
  const [weight, setWeight] = useState(0);
  const [sellerID, setSellerID] = useState(user1.user._id);
  const [imageLink, setImageLink] = useState("");

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  //Image upload file change handle
  function handleChange(event) {
    setFile(event.target.files[0]);
  };
  
  //Cagetory selection
  const handleDropdown = (event) => {
    setType(event.target.value);
  };

  //Send new product data to backend
  function sendProductData(event) {
    event.preventDefault();

    const newProduct = {
      name,
      description,
      price,
      quantity,
      category,
      subCategory,
      mfd,
      exp,
      weight,
      sellerID,
      imageLink
    };

    axios
      .post("http://localhost:8002/product/add/", newProduct)
      .then(() => {
        window.alert("New Product Was Added !");
        navigate('/allProducts');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Image upload
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

  return (
    <div>
      <form style={{marginLeft: "10%", marginTop: "20px"}}>
        <br />
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
        <br />
        <div className="row md-6">
          <div className="col-md-6">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Product Name :
            </label> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="Product Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-6">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Description :
            </label> */}
            <textarea
              type="text"
              className="form-control"
              required
              placeholder="Description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <br/>
        <div className="row md-6">
          <div className="col-md-3">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Price (RS) :
            </label> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="Price (Rs)"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Quantity :
            </label> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="Quantity"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-3">
            {/* <label className="labels" style={{ float: "left" }}>
              Select Category :
            </label> */}
            
            <select 
              className="form-control"
              onChange={handleDropdown}>
              <option value="">Select Cagetory</option>
              <option value="cream">Cream</option>
              <option value="oil">Oil</option>
              <option value="soap">Soap</option>
              <option value="shampoo">Shampoo</option>
              <option value="weight gainer">Weight Gainers</option>
              <option value="vitamin">Vitamins</option>
            </select>
          </div>
          <div className="col-md-3">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Weight :
            </label> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="Weight (g)"
              onChange={(event) => {
                setWeight(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-6">
            {/* <label className="labels" style={{ float: "left" }}>
              Enter Sub Category :
            </label> */}
            <input
              type="text"
              className="form-control"
              required
              placeholder="Sub Category"
              onChange={(event) => {
                setSubCategory(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6">
          <div className="col-md-3">
            <label className="labels" style={{ float: "left" }}>
              Manufactured Date :
            </label>
            <input
              type="date"
              className="form-control"
              required
              onChange={(event) => {
                setMfd(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="labels" style={{ float: "left" }}>
              Expiry Date :
            </label>
            <input
              type="date"
              className="form-control"
              required
              onChange={(event) => {
                setExp(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-6" style={{ marginTop: '10px', marginLeft: "1px"}}>
          <button
          style={{width: "auto"}}
            className="btn btn-success"
            type="button"
            onClick={sendProductData}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
