import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [authentication, setAuthentication] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password } = authentication;
    const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    setLoading(false);

    if (json.success) {
      localStorage.setItem('token', json.token);
      navigate('/');
      props.showAlert("Sign up successfully","success");
    } else {
      props.showAlert("Invalid Credentials","danger");
    }
  };

  const onChange = (e) => {
    setAuthentication({ ...authentication, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing up...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
