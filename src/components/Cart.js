import React,{useContext} from 'react'
import BookContext from '../context/BookContext'

const Cart = () => {
    const context=useContext(BookContext)
    const{cart,setCart,fetchCart,addBook,deleteBook}=context;
  return (
    <>
    {cart.length === 0 && <h4>Your Cart is Empty</h4>}
    <div className='container'>
          {cart.length !== 0 && cart.map((Book) => {
            return <div className="card mb-2">
                    <div className="row align-items-center">
                      <div className="col-sm-2">
                        <img src={Book.image_url} alt={Book.title} width="100%"/>
                      </div>
        
                      <div className="col-sm-10">
                        <div className="card-body">
                          <p className='d-flex justify-content-between'>
                          <h5 className="card-title">{Book.title}</h5>
                          <i class="fa-solid fa-cart-shopping" onClick={()=>{deleteBook(Book._id)}}></i>
                          </p>
                          <p className="my-1 text-muted">
                            <strong>Author:</strong> {Book.author}
                            
                          </p>
                          
                          <p className="my-1 text-muted">
                            <strong>Cost:</strong> {Book.cost}$
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
           
          })}
    </div></>
  )
}

export default Cart