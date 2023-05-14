import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, json, useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",

  })
  const handlesubmit = async (e) => {
    e.preventDefault()
    // console.log("Form Submitted")
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        email: credentials.email,
        password: credentials.password,
      })


    })
    const data = await response.json()
    console.log(data)
    if (data.success) {
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authtoken",json.authtoken)
      console.log(localStorage.getItem("authtoken"))
      navigate("/");
    }
  }

  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
    // setcredentials();
  }
  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <form onSubmit={handlesubmit}>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange} />

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" >Password</label>
            <input type="password" className="form-control" placeholder="Password" name='password' value={credentials.password} onChange={onchange} />
          </div>

          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">Create a User?</Link>
        </form>
      </div>
    </>
  )
}

export default Login