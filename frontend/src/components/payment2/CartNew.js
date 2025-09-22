import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

export default function CartNew() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [stripeToken, setStripeToken] = useState(null); // Track the Stripe token

  const [name, setName] = useState();
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryService, setDeliveryService] = useState('');

  //const [itemCount, setItemCount] = useState(0)
  const user = JSON.parse(localStorage.getItem("user"));
  let totalPrice = 0;
  let commision = 0.05;

  useEffect(() => {
    axios
      .get(`http://localhost:8002/cart/get/${user.user._id}`)
      .then((res) => {
        console.log(res);
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setDeleted(false);
  }, [deleted]);


  function removeFromCart(id) {
    const response = window.confirm("Are you sure ?");
    if (response) {
      axios
        .delete(`http://localhost:8002/cart/delete/${id}`)
        .then(() => {
          window.alert("Deleted From Cart !");
          setDeleted(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function saveBuyerReq(){
    const userID = user.user._id;
    const productsList = cartItems;
    const createdAt = new Date();
    const status = 'Pending';
    const total = totalPrice;
    const uName = name;
    const uAddress = address;
    const uProvince = province;
    const uZipCode = zipCode;
    const uPhone = phone;
    const delivery = deliveryService;

    const newReq = {userID, productsList, createdAt, status, total, uName, uAddress, uProvince, uZipCode, uPhone, delivery};

    axios.post('http://localhost:8002/buyerReq/add', newReq)
    .then(()=>{
      console.log(newReq);
      console.log("Req Saved");
    })
    .catch((err)=>{
      console.log(err);
    })
  };


  const handleToken = (token) => {

        // Set the Stripe token when availabl
        setStripeToken(token);
    
        // Make API call after setting the token
        axios
          .post("http://localhost:8002/checkout", {
            token: token,
            amount: totalPrice * 100, // Stripe uses cents
          })
          .then((response) => {
            console.log(response);
              navigate('/success');
              
            // Process the payment success/failure logic here
          })
          .catch((error) => {
            console.log(error);
            // Handle the error
          });
    
      }
    
    
    function handelDropdown(event){
      setDeliveryService(event.target.value);
    }

  return (
    <div style={{padding: "50px"}}>
  
      <h3>My Cart Items</h3>
      <hr/>
      <br/>
      <div className="row">
        <div className="col">
      {cartItems.map((cartItemsData) => (
        <div>
          <div style={{ display: "inline-block"}}>
            <img src={cartItemsData.image} style={{width : "200px", borderRadius: "10px"}} />
          </div>
          
          <div style={{display: "inline-block", marginLeft : "20px", position: "relative", top :"25px"}}>
            <p>Name : {cartItemsData.productName}</p>
            <p>Price : Rs {cartItemsData.price}.00</p>
            <button className="btn btn-danger" onClick={() => removeFromCart(cartItemsData._id)}>
              Remove From Cart
            </button>
          </div>
          <p style={{ visibility: "hidden" }}>
            {(totalPrice = totalPrice + cartItemsData.price)}
          </p>
          
        </div>
      ))}
      </div>
    

      <div className="col" style={{position: "relative"}}>
      <form style={{marginLeft: "10%", marginTop: "20px"}}>
        <h3>Fill Your Delivey Details Here</h3>
        <hr/>
        <br />
        <div className="row md-12">
          <div className="col-md-12">
            <input 
              type="text"
              placeholder="Name"
              class="form-control" 
              value={name} 
              required
              onChange={(event)=>{setName(event.target.value)}}
              />
          </div>
        </div>
        <div className="row md-12">
          <div className="col-md-12">
            <input 
              type="text"
              placeholder="Address"
              class="form-control" 
              value={address} 
              required
              onChange={(event)=>{setAddress(event.target.value)}}
              />
          </div>
        </div>
        <div className="row md-12">
          <div className="col-md-12">
            <input 
              type="text"
              placeholder="Province / State"
              class="form-control" 
              value={province} 
              required
              onChange={(event)=>{setProvince(event.target.value)}}
              />
          </div>
        </div>
        <div className="row md-12">
          <div className="col-md-12">
            <input 
              type="text"
              placeholder="Zip / Postal Code"
              class="form-control" 
              value={zipCode} 
              required
              onChange={(event)=>{setZipCode(event.target.value)}}
              />
          </div>
        </div>
        <div className="row md-12">
          <div className="col-md-12">
            <input 
              type="text"
              placeholder="Phone Number"
              class="form-control" 
              value={phone} 
              required
              onChange={(event)=>{setPhone(event.target.value)}}
              />
          </div>
        </div>
        <div className="row md-12">
          <div className="col-md-12">
            <select
            className="form-control"
              onChange={handelDropdown}>
              <option value="">Select Delivey Service</option>
              <option value="dhl">DHL</option>
              <option value="promtexpress">Promt Express</option>
              <option value="domex">Domex</option>
              <option value="certies">Certies Lanka</option>
              <option value="pronto">Pronto</option>
            </select>
          </div>
        </div>
        </form>
      </div>
      </div>
      
      <hr></hr>
      <br/>
      <p>Commision is 5% = Rs {(commision = totalPrice * commision)}.00</p>
      <h4>Total is : {totalPrice + commision}</h4>
      <br/>
      {/* <button className="btn btn-success" onClick={saveBuyerReq} >Proceed To Pay ➡️</button> */}

      <StripeCheckout
        stripeKey="pk_test_51MxnUfIr55hAMMKQuMS7wvYObxnJIi1y1iBbWUtkkHDx4jXFEo98NJDOzjUYEcFJftzUwyd5LeS63w442jBMy7iM00GdnVjReF"
        token={handleToken}
        amount={totalPrice * 100} // Stripe uses cents
        name="My Online Store"
        description="Payment for cart items"
        currency="USD"
      >
        <button style={{marginLeft : "-35px"}} className="btn btn-success" onClick={saveBuyerReq}>Proceed To Pay ➡️</button>
      </StripeCheckout>
    </div>
  );
}
