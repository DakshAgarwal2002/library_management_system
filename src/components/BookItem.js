import React, { useContext } from 'react'
import BookContext from '../context/BookContext'
const BookItem = (props) => {
  const context=useContext(BookContext)
  const{cart,setCart,fetchCart,addBook,deleteBook}=context;
  return (
    <>
    <div className="card mb-2">
            <div className="row align-items-center">
              <div className="col-sm-2">
                <img src={props.Book.published_works && props.Book.published_works[0].cover_art_url} alt={props.Book.title} width="100%"/>
              </div>

              <div className="col-sm-10">
                <div className="card-body">
                  <p className='d-flex justify-content-between'>
                  <h5 className="card-title">{props.Book.title}</h5>
                  <i class="fa-solid fa-cart-shopping" onClick={()=>{addBook(props.Book.title,props.Book.authors[0],props.Book.measurements.english.lexile ? Math.trunc(props.Book.measurements.english.lexile/12): "10",props.Book.published_works[0].cover_art_url)}}></i>
                  </p>
                  
                  

                  <p className="my-1 text-muted">
                    <strong>Author:</strong> {props.Book.authors[0]}
                    
                  </p>
                  <p className="my-1 text-muted">
                    <strong>Series:</strong> {props.Book.series_name ? props.Book.series_name:'null'}
                  </p>
                  <p className="my-1 text-muted">
                    <strong>Suggested age:</strong> {props.Book.min_age} - {props.Book.max_age}
                  </p>
                  <p className="my-1 text-muted">
                    <strong>Cost:</strong> {props.Book.measurements.english.lexile ? Math.trunc(props.Book.measurements.english.lexile/12): "10"}$
                  </p>

                  <p className="my-1 text-muted">
                    <strong>Available Copies: </strong>{props.Book.measurements.english.lexile}
                  </p>

                  <p className="my-1 text-muted">
                    <strong>Page Count:</strong> {props.Book.page_count}
                  </p>
                  <p className="my-1 text-muted">
                    <strong>Categories:</strong> 
                    {props.Book.categories.map((Category)=>{
                        return <span>{Category}</span>
                    })}
                  </p>

                  <p className="my-1">
                    <strong>Summary:</strong>
                  </p>
                  <p className="my-1">
                  {props.Book.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default BookItem