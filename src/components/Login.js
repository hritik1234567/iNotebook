import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [authentication, setAuthentication] = useState({ email: "", password: "" });
  let navigate=useNavigate();
  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: authentication.email, password: authentication.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.token);
        navigate('/');
        props.showAlert("Logged in successfully","success");
    }
    else{
        props.showAlert("Invalid Credentials","danger");
    }
  };

  const onChange = (e) => {
    console.log("update button clicked");
    setAuthentication({ ...authentication, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={authentication.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={authentication.password} onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;
