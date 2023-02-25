import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";


const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmpassword: ""}) 
     
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
          if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/Home");
    }else{
      alert("invalid credentials")
    }
  }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <section className="vh-100 m-5">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="frontend-cloud-logs\src\images\clgs.svg"
                    className="img-fluid" alt="Sample"/>
                </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">


            <form  onSubmit={handleSubmit}>
            <div className="form-outline mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name"/>
                </div>
                <div className="form-outline mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-outline mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="form-outline mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="confirmpassword" id="confirmpassword" minLength={5} required/>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>
                </div>

                <div className="text-center">
                  <Link aria-current="page" to='/Login'>Existing User? Login</Link>
                  </div>
            </form>
        </div>
        </div>
        </div>
        </section>
    )
}

export default Signup