import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function viewFeedbacks() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8001/api/feedback")
        .then((res)=>{
            setFeedbacks(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

  return (
    <div>
        <br/>
        <h3 style={{display: "inline-block", marginLeft: "20px"}}>All Feedbacks</h3>
        <Link to="/addFeedback"><button className='btn btn-warning' style={{flot: "left", display: "inline-block", float: "right"}}>Add A New Feedback </button></Link>
        <Link to="/myFeedbacks"><button className='btn btn-success' style={{flot: "left", display: "inline-block", float: "right", marginRight: "10px"}}>My Feedbacks </button></Link>
        <br></br>
        <br></br>
            {feedbacks.map((feedbackData)=>(  
                <div key={feedbackData._id}> 
                    <table class="table">               
                        <tr scope="row">
                            <b><td scope="col" style={{width: "300px", textAlign: "left"}}>{feedbackData.topic}</td></b>
                            <td scope="col" style={{}}>{feedbackData.description}</td>
                        </tr>  
                    </table>  
                </div>
            ))}
            {feedbacks == '' && (
                <div style={{textAlign: "center", marginTop: "200px"}}>
                    <h4>Currently No Feedbacks are Avaliable</h4>
                </div>
            )}
    </div>
  )
}
