import { useEffect, useState , useRef} from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import formClasses from "./../Foms/AddForm.module.css"
import reportsClasses from "./Reports.module.css";

function ShowAuthorBooks() {
  const [books, getBooks] = useState([]);
  const url = "http://127.0.0.1:3000/author";

  const authorIdInputRef = useRef();

  const getAllBooks = (id) => {  
    const newUrl = url + "/" + id + "/books"

    axios.get(newUrl).then((res) => {
      getBooks(res.data);
    });
  };

  const deleteBook = (id) => {
    const newUrl = url + "/" + authorIdInputRef.current.value + "/book/" + id 

    axios.delete(newUrl).then((res) => {
        getAllBooks(authorIdInputRef.current.value);
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    const authorId = authorIdInputRef.current.value;

    getAllBooks(authorId);
  }

  useEffect(() => getAllBooks(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
      <form className={formClasses.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="authorId">Author ID: </label>
            <input type="text" id="authorId" ref={authorIdInputRef}/>
          </div>
          <button>Find books</button>
        </form>
        <div className={reportsClasses.title}>
          <span className={reportsClasses.w25}>Book ID</span>
          <span className={reportsClasses.w25}>Title</span>
          <span className={reportsClasses.w25}>Year</span>
          <span className={reportsClasses.w25}>Action</span>
        </div>
        <div className={reportsClasses.dataWrapper}>
          {books.map((book) => (
            <div key={book._id} className={reportsClasses.element}>
              <span className={reportsClasses.w25}>{book._id}</span>
              <span className={reportsClasses.w25}>{book.title}</span>
              <span className={reportsClasses.w25}>{book.year}</span>
              <span className={reportsClasses.w25}> 
                <button onClick={() => {deleteBook(book._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowAuthorBooks;