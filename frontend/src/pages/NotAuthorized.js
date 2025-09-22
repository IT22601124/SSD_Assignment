import React from 'react'

export default function NotAuthorized() {

  return (
    <div style={{marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
        <h1>401 Unauthorized</h1>
        <br/>
        <h3>You dont have permisstions to view requested page</h3> 
        <h4>please use valid login to continue !</h4>
    </div>
  )
}
