import React,{useState} from 'react'
import BookContext from './BookContext'
const BookState = (props) => {

    // const host = "http://localhost:5000"
    const host="https://lmsbackend-kb2i.onrender.com"
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        const response = await fetch(`${host}/api/cart/fetchCart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('token')
          },
        });
        const json = await response.json()
        setCart(json.sort());
      }

      const addBook = async (title, author, cost,image_url) => {
        const response = await fetch(`${host}/api/cart/addBook`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('token')
          },
          body: JSON.stringify({title, author, cost,image_url}),
        });
        fetchCart()  
      }

      const deleteBook = async (id) => {
        const response = await fetch(`${host}/api/cart/deleteBook/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('token')
          },
        });
        const json = response.json;
        console.log(json)
        console.log("Delete note with ID" + id);
        const NewCart = cart.filter((item) => { return item._id !== id })
        setCart(NewCart)
      }

    
  return (
    <BookContext.Provider value={{cart,setCart,fetchCart,addBook,deleteBook}}>
       {props.children}
    </BookContext.Provider>
  )
}

export default BookState