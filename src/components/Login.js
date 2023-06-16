import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let history=useNavigate()
    const handleSubmit=async (e)=>{
      // fetch('http://localhost:5000/api/auth/login')
      e.preventDefault();
      // console.log("Login Successful")
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}),
      });
      const json=await response.json();
      console.log(json);
        if(json.success)
        {
          props.showAlert("login Successful","success")
          sessionStorage.setItem('token',json.authtoken)
          history("/");
        }
        else{
           props.showAlert("Use Correct Credentials","danger")
        }
        
    }

    const onChange = (e) => {
      setCredentials({
        ...credentials, [e.target.name]: e.target.value
      })
    }

  return (
    <div className='container my-2'>
      <h2>Login to continue Visual Notes</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form >
    </div>
  )
}

export default Login