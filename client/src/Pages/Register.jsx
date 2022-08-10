import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
const axios = require('axios').default;


function Register(){

  const [checked, setChecked] = useState(false);  
  const [ isSeller , setIsSeller] = useState(false);
  const [user , setUser] = useState({
    username: "",
    password: "",
    isSeller: checked
  });

  function updateUser(event){

    const { name, value } = event.target;

    setUser(prevValue => {
      return {
      ... prevValue,
      [name] : value
    }});
    //  console.log(user);
    //  console.log(checked ? "true": "false");
  }

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }

    async function sendUserData(){

    const URL = 'https://metacentralandserver.herokuapp.com/users/register'; // for Heroku
    // const URL = 'http://localhost:4000/users/register'; // for Local

  
    axios.post(URL, {
      username: user.username,
      password: user.password,
      isSeller: checked ? "true": "false"
    })
    .then((res) => {
      if (res.data){
        console.log(res.data);
        if (res.data == "User exist"){
          alert("User exist");
        }else{
          handleClick("/login");
        }

        setUser({username: "",password: "" , isSeller: false});
      }else{
        alert("The details are wrong");
        handleClick("/register");
        setUser({username: "",password: "", isSeller: false});
      }
    });
  }

  function updateIsSeller(event){
    setIsSeller(event.target.value);
  }


    return <div className="container mt-5 w-50">
  <h1 className="text-center mb-5">Register</h1>

  <div className="">
    <div className="">
      <div className="card">
        <div className="card-body text-center">

          
            <div className="form-group">
              <label for="email">Email</label>
              <input onChange={updateUser} value={user.username} type="email" className="form-control" name="username" required/>
            </div>
            <div className="form-group ">
              <label for="password">Password</label>
              <input onChange={updateUser} value={user.password} type="password" className="form-control" name="password" required/>
            </div>
            <div>
              <form>
                <label>You are a Seller?</label>
                <input type="checkbox" value={user.isSeller} checked={checked}  onChange={e => { if (checked !== undefined)
                setChecked(e.target.checked)}}   />
              </form>
            </div>
            <button onClick={sendUserData} className="btn btn-dark ">Register</button>
            <a href="/" className="btn btn-outline-dark left ">Back</a>

          
        </div>
      </div>
    </div>

    

  </div>
</div>;
}


export default Register;