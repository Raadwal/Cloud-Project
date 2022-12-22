import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ShowBooksReport() {
  const [books, getBooks] = useState([]);
  const url = "http://127.0.0.1:3000/book";

  const getAllBooks = () => {
    axios.get(url).then((res) => {
      getBooks(res.data);
    });
  };

  const deleteBook = (id) => {
    axios.delete(url + "/" + id).then((res) => {
      getBooks(prevState => {
        return prevState.filter((book) => book._id !== id);
      });
    });
  };

  useEffect(() => getAllBooks(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w25}>Book ID:</span>
          <span className={classes.w25}>Title</span>
          <span className={classes.w20}>ISBN</span>
          <span className={classes.w15}>Year</span>
          <span className={classes.w15}>Action</span>
        </div>
        <div className={classes.dataWrapper}>
          {books.map((book) => (
            <div key={book._id} className={classes.element}>
              <span className={classes.w25}>{book._id}</span>
              <span className={classes.w25}>{book.title}</span>
              <span className={classes.w20}>{book.isbn}</span>
              <span className={classes.w15}>{book.year}</span>
              <span className={classes.w15}> 
                <button onClick={() => {deleteBook(book._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowBooksReport;