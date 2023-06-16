import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookItem from './BookItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
var data = require("./MOCK_AUTHOR.json");
var datatitle=require("./MOCK_TITLE.json")
const Home = (props) => {

  let history = useNavigate()
  const [param, setParam] = useState({ title: "", author: "", genre: "" })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const BooksPerPage = useRef(5)
  const onChange = (e) => {
    setParam({
      ...param, [e.target.name]: e.target.value
    })
  }

  const updateList = async () => {
    setLoading(true);
    var url;
    let title = param.title;
    title = title.replace(/\s/g, '%20');
    title = title.replace(/,/g, '%2C');
    title = title.replace(/&/, '%26')

    let author = param.author;
    author = author.replace(/\s/g, '%20');
    author = author.replace(/,/g, '%2C');
    author = author.replace(/&/, '%26')
    if (param.title == "" && param.author == "" && param.genre == "") {
      url = `https://book-finder1.p.rapidapi.com/api/search?results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title != "" && param.author == "" && param.genre == "") {

      url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title == "" && param.author != "" && param.genre == "") {

      url = `https://book-finder1.p.rapidapi.com/api/search?author=${author}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title == "" && param.author == "" && param.genre != "") {

      url = `https://book-finder1.p.rapidapi.com/api/search?categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title != "" && param.author != "" && param.genre == "") {
      url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&author=${author}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title == "" && param.author != "" && param.genre != "") {
      url = `https://book-finder1.p.rapidapi.com/api/search?author=${author}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else if (param.title != "" && param.author == "" && param.genre != "") {
      url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    else {
      url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&author=${author}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
    }
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a8ada6e2d2msh435e398a718481cp152854jsn6019ae19cc09',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
      }
    }
    let data = await fetch(url, options)
    let parsedata = await data.json()

    setLoading(false)
    setTotalResults(parsedata.total_results);
    await setBooks(parsedata.results);
    console.log(books)
  }


  useEffect(() => {
    if (sessionStorage.getItem('token')) {

    }
    else {
      history("/login");
    }
  }, [])

  return (
    <>
      <h1 className='text-center'><strong>Search your book</strong></h1>
      <div className="input-group flex-nowrap pt-3">
        <span className="input-group-text" id="addon-wrapping">Title</span>
        <input type="text" className="form-control" placeholder="Search by title" id="title" name="title" value={param.title} onChange={onChange} />
        
      </div>
      <div className="dropdown">
          {datatitle
            .filter((item) => {
              const searchTerm = param.title.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => setParam({...param, title: item.full_name})}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>

      <div className="input-group flex-nowrap pt-3">
        <span className="input-group-text" id="addon-wrapping">Author</span>
        <input type="text" className="form-control" placeholder="Search by author" id="author" name="author" value={param.author} onChange={onChange} />
      </div>
      <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = param.author.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => setParam({...param, author: item.full_name})}
                className="dropdown-row"
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>

      <h5 className='mt-2'>Genre</h5>
      <ul className="list-group col-6">
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Mystery%20%26%20Suspense" id="Mystery_and_Suspense" onClick={onChange} />
          <label className="form-check-label" htmlFor="firstRadio">Mystery & Suspense</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Science%20Fiction%20%26%20Fantasy" id="Science_Fiction_Fantasy" onClick={onChange} />
          <label className="form-check-label" htmlFor="secondRadio">Science Fiction & Fantasy</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Animals%2C%20Bugs%20%26%20Pets" id="Animals_Bugs_Pets" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Animals, Bugs & Pets</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Art%2C%20Creativity%20%26%20Music" id="Art_Creativity_Music" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Art, Creativity & Music</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="General%20Literature" id="General_Literature" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">General Literature</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Hobbies%2C%20Sports%20%26%20Outdoors" id="Hobbies_Sports_Outdoors" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Hobbies, Sports & Outdoors</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Real%20Life" id="Real_Life" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Real Life</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Science%20%26%20Technology" id="Science_Technology" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Science & Technology</label>
        </li>
        <li className="list-group-item">
          <input className="form-check-input me-1" type="radio" name="genre" value="Reference" id="Reference" onClick={onChange} />
          <label className="form-check-label" htmlFor="thirdRadio">Reference</label>
        </li>
      </ul>
      <div className='d-flex justify-content-center mt-3'>
      <div class="GlowingGradientButtonBox my-2">
              <button onClick={updateList}>Search</button>
          </div>
      {/* <button type="button" className="btn btn-primary" onClick={updateList}>Search</button> */}
      </div>
      
      <h2><strong>Total Results : {totalResults}</strong></h2>
      <h2>Available Books</h2>
      {loading && <Spinner />}
      {books.length === 0 ? <p>No books to display</p> : ""}
      <InfiniteScroll
        dataLength={books.length}
        next={async() => {
          setPage(page + 1);
          var url;
          let title = param.title;
          title = title.replace(/\s/g, '%20');
          title = title.replace(/,/g, '%2C');
          title = title.replace(/&/, '%26')

          let author = param.author;
          author = author.replace(/\s/g, '%20');
          author = author.replace(/,/g, '%2C');
          author = author.replace(/&/, '%26')
          if (param.title == "" && param.author == "" && param.genre == "") {
            url = `https://book-finder1.p.rapidapi.com/api/search?results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title != "" && param.author == "" && param.genre == "") {

            url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title == "" && param.author != "" && param.genre == "") {

            url = `https://book-finder1.p.rapidapi.com/api/search?author=${author}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title == "" && param.author == "" && param.genre != "") {

            url = `https://book-finder1.p.rapidapi.com/api/search?categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title != "" && param.author != "" && param.genre == "") {
            url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&author=${author}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title == "" && param.author != "" && param.genre != "") {
            url = `https://book-finder1.p.rapidapi.com/api/search?author=${author}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else if (param.title != "" && param.author == "" && param.genre != "") {
            url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          else {
            url = `https://book-finder1.p.rapidapi.com/api/search?title=${title}&author=${author}&categories=${param.genre}&results_per_page=${BooksPerPage.current}&page=${page}`
          }
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'a8ada6e2d2msh435e398a718481cp152854jsn6019ae19cc09',
              'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
            }
          }
          let data = await fetch(url, options)
          let parsedata = await data.json()
          await setBooks(books.concat(parsedata.results));
        }}
        hasMore={books.length !== totalResults}
        loader={<Spinner />}
      >

        <div className='container'>
          {books.length !== 0 && books.map((Book) => {
            return <BookItem Book={Book} />
          })}
        </div>
      </InfiniteScroll>
      
    </>
  )
}

export default Home