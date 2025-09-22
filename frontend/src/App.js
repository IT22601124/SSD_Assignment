import React from "react";
import { BrowserRouter, Routes, Route, Navigate, RouterProvider } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NavBar from './components/NavBar';
import SideBar from "./components/SideBar";

import BuyerDashboard from "./components/buyer/BuyerDashboard";
import SellerDashboard from './components/seller/SellerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import BuyerReqests from './components/admin/BuyerReqests';
import Orders from './components/buyer/Orders';

import AddNewProduct from './components/product/AddNewProduct';
import AllProducts from './components/product/AllProducts';
import OneProduct from './components/product/OneProduct';
import EditProduct from './components/product/EditProduct';
import SellerProducts from "./components/product/SellerProducts";
import OneCategory from "./components/product/OneCategory";

import ViewFeedbacks from "./components/feedback/viewFeedbacks";
import AddNewFeedback from "./components/feedback/AddNewFeedback";
import MyFeedbacks from "./components/feedback/MyFeedbacks";
import AddReview from "./components/feedback/AddReview";

import { ToastContainer } from "react-toastify";

import Home2 from "./components/payment/Home";
import NotFound from "./components/payment/NotFound";
import Cart from "./components/payment/Cart";

import "react-toastify/dist/ReactToastify.css";
//import CheckoutSuccess from "./components/payment/CheckoutSuccess";
import CartNew from './components/payment2/CartNew';
import ReservationSuccessful from "./components/payment2/ReservationSuccessful";

import NotAuthorized from "./pages/NotAuthorized";


function App() {
  const { user } = useAuthContext();
  const user1 = JSON.parse(localStorage.getItem('user'));
  console.log(user1);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadUser(null));
  // }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <NavBar/>
      <div style={{width: "15%", float: "left"}}>
        <SideBar/>
      </div>
      <div style={{width: "85%", float: "right"}}>
        <div className="pages">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path='/home' element={<Home2/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/buyer" element={user1 && user1.user.type == 'buyer' ? <BuyerDashboard/> : <NotAuthorized/>} />
              <Route path="/seller" element={user1 && user1.user.type == 'seller' ? <SellerDashboard/> : <NotAuthorized/>} />
              <Route path="/admin" element={user1 && user1.user.type == 'admin' ? <AdminDashboard/> : <NotAuthorized/>} />

              <Route path="/allProducts" element={<AllProducts/>} />
              <Route path="/addProduct" element={(user1 && user1.user.type == 'seller') || (user1 && user1.user.type == 'admin') ? <AddNewProduct/> : <NotAuthorized/>} />
              <Route path="/editProduct/:id" element={(user1 && user1.user.type == 'seller') || (user1 && user1.user.type == 'admin') ? <EditProduct/> : <NotAuthorized/>} />
              <Route path="/oneProduct/:id" element={<OneProduct/>} />  
              <Route path="/sellerProducts" element={user1 && user1.user.type == 'seller' ? <SellerProducts/> : <NotAuthorized/>} /> 
              <Route path="/oneCategory/:category" element={<OneCategory/>} />
 
              <Route path="/orders" element={<Orders/>} />
              <Route path="/buyerRequest" element={<BuyerReqests/>} />
              <Route path="/viewFeedback" element={<ViewFeedbacks/>} />
              <Route path="/addFeedback" element={<AddNewFeedback/>} />
              <Route path="/myFeedbacks" element={<MyFeedbacks/>} />
              <Route path="/addReview" element={<AddReview/>} />

              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cartNew" element={<CartNew/>} />
              <Route path="/success" element={<ReservationSuccessful/>} />

            </Routes>
          </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
