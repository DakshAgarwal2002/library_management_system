import React,{useState} from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import BookState from './context/BookState';
import Cart from './components/Cart';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <div className='App'>
      <BookState>
    <Router>
      <Navbar/>
    <Alert  alert={alert}/>
      <div className='container my-3'>
      <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/signup"  element={<Signup showAlert={showAlert}/>}/>
      <Route exact path="/cart"  element={<Cart showAlert={showAlert}/>}/>
    </Routes>
    </div>
    <footer class="sticky-footer">
      <hr/>
    <p class="mb-2 text-muted">
      © 2023 Book Finder
    </p>
  </footer>
    </Router>
    </BookState>
    </div>
  );
}

export default App;
