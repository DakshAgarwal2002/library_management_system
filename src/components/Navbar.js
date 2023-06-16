import React from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'
const Navbar = () => {
  let history=useNavigate()
    let location = useLocation();
    const logout=(e)=>{
      sessionStorage.removeItem('token');
      // sessionStorage.setItem('token',"");
      history("/login");
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark  fixed-top"  data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/" style={{"color":"white"}}>Visual Library</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/'?"active":""}`} style={{"color":"white"}} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==='/cart'?"active":""}`} style={{"color":"white"}} aria-current="page" to="/cart">Cart</NavLink>
        </li>
      </ul>
      {!sessionStorage.getItem('token')?<form className="d-flex" role="search">
      <a className="btn btn-primary" href="/signup" role="button">Signup</a>
      <a className="btn btn-primary mx-2" href="/login" role="button">Login</a>
      </form>: <form className="d-flex" role="search">
      <a className="btn btn-danger mx-2" role="button" onClick={logout}>Logout</a>
        </form>}
    </div>
  </div>
</nav>
  )
}

export default Navbar