import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Signup = () => {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",

    })
    const handlesubmit = async (e) => {
        e.preventDefault()
        // console.log("Form Submitted")
        const response = await fetch("https://gofoodapp-cmei.onrender.com/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,

            })


        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            navigate("/")
        }

    }

    const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
        // setcredentials();
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" name='name' value={credentials.name} onChange={onchange} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1" >Password</label>
                        <input type="password" className="form-control" placeholder="Password" name='password' value={credentials.password} onChange={onchange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" placeholder="Enter Location" name='geolocation' value={credentials.geolocation} onChange={onchange} />

                    </div>
                    <button type="submit" className="m-3 btn btn-primary" >Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
                </form>
            </div>
        </>
    )
}

export default Signup