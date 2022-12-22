import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddAuthorBook() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/author";
  
    const authorIdInputRef = useRef();
    const bookIdInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const data = {
        authorId: authorIdInputRef.current.value,
        bookId: bookIdInputRef.current.value,
      };
  
      const newUrl = url + "/" + data.authorId + "/wrote/" + data.bookId; 

      axios.post(newUrl, data).then((res) => {    
        if(res.data.author.length > 0 && res.data.book.length > 0) {
          setResponse("Success!");
          event.target.reset();
        } else {
          setResponse("Fail!");
        }
      });
    }
  
    return (
      <div>
        <FormsNavigation />
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="authorId">Author ID: </label>
            <input type="text" id="authorId" ref={authorIdInputRef} />
          </div>
          <div>
            <label htmlFor="bookID">Book ID: </label>
            <input type="text" id="bookId" ref={bookIdInputRef} />
          </div>
          <button>Add Authors Book</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddAuthorBook;