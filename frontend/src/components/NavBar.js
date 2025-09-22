import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Logo from '../images/NaturaLogo.png'

export default function NavBar() {
  const navigate = useNavigate();
  
  const user1 = JSON.parse(localStorage.getItem('user'));
  const {logout} = useLogout()

  const {user} = useAuthContext()
  //console.log("Nav ", user);

  const handleClick = ()=>{
    logout()
  }

  function goToProfile(){
    if(user1){
      if(user1.user.type == 'seller')
        navigate('/seller');

      else if(user1.user.type == 'buyer')
        navigate('/buyer');

      else if (user1.user.type == 'admin')
        navigate('/admin');
    }
    else{
      navigate('/login')
    }
    
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "green"}}>
        <a className="navbar-brand" style={{fontSize: "35px", color: "lightyellow"}}>
          Natura
        </a>
        <img src={Logo} style={{width: "50px", marginRight: "60px"}}/>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/"> <a className="nav-link" style={{color: "white", fontSize: "20px"}}>
                Home <span className="sr-only">(current)</span>
              </a></Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{color: "white"}}
              >
                All Products
              </a> */}

              {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/allProducts"> <a className="dropdown-item">
                  Creams
                </a></Link>
                <a className="dropdown-item">
                  Body Lotions
                </a>
                <a className="dropdown-item">
                  Vitamins
                </a>
                <a className="dropdown-item">
                  Herbal Soap
                </a>
                <a className="dropdown-item">
                  Oils
                </a>
              </div> 
            </li>*/}
            <li className="nav-item" style={{padding: '0', marginTop: "32px"}}>
              <Link to="/viewFeedback"><a style={{color: "white", fontSize: "20px"}}>Feedbacks</a></Link>
            </li>  
          </ul>
          <nav style={{marginRight: "20px"}}>
            {(user1 && user1.user.type == 'buyer') && (
              <div>
                  <Link to="/cartNew"><a className="btn btn-success" style={{color: "white"}}>My Cart</a></Link>
              </div>
            )}
            <a onClick={goToProfile} class="btn btn-success" style={{color: "white"}}>My Profile</a>
          </nav>
                 
          {/* <Link to="/login"><button type="button" class="btn btn-info" style={{marginRight: "10px"}}>Login</button></Link>
          <form className="form-inline my-2 my-lg-0"> 
          </form> */}
          <nav>
          {user && (
          <div>
            <span style={{color: "lightcyan"}}>{user.user.email}</span>
            <Link to="/"><button className="btn btn-light" style={{marginLeft: "10px"}} onClick={handleClick}> Logout</button></Link> 
          </div>)}
          {!user && (
          <div>
            <Link to="/login"><button type="button" class="btn btn-light" style={{marginRight: "10px"}}>Login</button></Link>
            <Link to="/signup"><button type="button" class="btn btn-light">Signup</button></Link>
          </div>)}
        </nav>
        </div>
      </nav>
    </div>
  );
};
