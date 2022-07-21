import React, { useState } from "react";
import GoogleEntry from "../Components/GoogleEntry";
import GoogleLogin from "react-google-login";
import httpRequestBuilder from "../httpRequest";
import { useNavigate } from "react-router-dom";
const axios = require('axios').default;



function Login(){


  const [user , setUser] = useState({
    username: "",
    password: ""
  });

  function updateUser(event){

    const { name, value } = event.target;

    setUser(prevValue => {
      return {
      ... prevValue,
      [name] : value
    }});
     console.log(user);
  }


  const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }


  
  async function sendUserData(){
   
    const URL = 'http://localhost:4000/users/login';

  
    axios.post(URL, {
      username: user.username,
      password: user.password
    })
    .then((res) => {
      if (res.data){
        // console.log(res.data);
        // console.log(localStorage.getItem("userMail"));
        // localStorage.removeItem("userMail");
        // localStorage.removeItem("userBalance");
        localStorage.setItem("userMail",JSON.stringify(res.data.username));
        localStorage.setItem("userBalance",JSON.stringify(res.data.balance));
        // console.log("after");        
        // console.log(localStorage.getItem("userMail"));

        setUser({username: "",password: ""});
        handleClick("/main");
        
      }else{
        alert("The details are wrong");
        handleClick("/login");
        setUser({username: "",password: ""});
      }
    });

  
  }
  



  
  return <div className="container mt-5 w-50">
  <h1 className="text-center mb-5">Login</h1>

  <div className="">
    <div className="">
      <div className="card">
        <div className="card-body text-center">

          
          
            <div className="form-group ">
              <label for="email">Email</label>
              <input onChange={updateUser} type="email" className="form-control" name="username" required/>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input onChange={updateUser} type="password" className="form-control" name="password" required/>
            </div>
            <button onClick={sendUserData} className="btn btn-dark ">Login</button>
            <a href="/" className="btn btn-outline-dark left ">Back</a>
          

        </div>
      </div>
    </div>
  </div>
</div>;
}


export default Login;


