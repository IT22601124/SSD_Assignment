import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNewFeedback() {
    const user1 = JSON.parse(localStorage.getItem('user'));
    const userID = user1.user._id;

    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");

    function sendFeedbackData(event){
        event.preventDefault();

        const newFeedback = {
            topic, description, userID
        };

        axios.post("http://localhost:8001/api/feedback/add-feedback", newFeedback)
        .then((res)=>{
            console.log(res);
            window.alert("Feedback Added Successfully !");
            navigate("/viewFeedback")
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
  return (
    <div>
        <br/>
        <h3 style={{marginLeft: "2%"}}>Add New Feedback</h3>
        <hr/>
        <br/>
        
        <div>
      <form style={{marginLeft: "20%", marginTop: "20px"}}>

        <div className="row md-8">
          <div className="col-md-8">
            <label className="labels" style={{ float: "left" }}>
              Enter Feedback Topic :
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setTopic(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="row md-8">
          <div className="col-md-8">
            <label className="labels" style={{ float: "left" }}>
              Enter Description :
            </label>
            <textarea
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        
        <div className="row md-6" style={{ marginTop: '20px', marginLeft: "1px"}}>
          <button
            style={{width: "80px"}}
            className="btn btn-success"
            type="button"
            onClick={sendFeedbackData}
          >
            Add
          </button>
        </div>
      </form>
    </div>

    </div>
  )
}
