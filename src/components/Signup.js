import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({email:"",name:"",password:"",cpassword:""})
  let history=useNavigate()
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(credentials.password!==credentials.cpassword)
    props.showAlert("Password did not match","danger")
    else{
      const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
    });
    const json=await response.json();
    console.log(json);
    if(json.success)
    {
      props.showAlert("Signup successful","success")
      sessionStorage.setItem('token',json.authtoken)
        history("/");
    }
    else{
      props.showAlert("Signup failed user already exists","danger")
    }
    
    }
    
    // console.log("Login Successful")
    
      
  }
  const onChange=(e)=>{
    setCredentials({
      ...credentials, [e.target.name]: e.target.value
    })
  }
  return (
    <div className='container my-2'>
      <h2>Signup to continue Visual Notes</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required minLength={8}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required minLength={8}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} required minLength={8}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} required minLength={8}/>
  </div>
  <button type="submit" disabled={credentials.password.length<=7 || credentials.cpassword.length<=7} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup