import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddBookForm() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/book";
  
    const titleInputRef = useRef();
    const yearCodeInputRef = useRef();
    const isbnInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const book = {
        title: titleInputRef.current.value,
        year: yearCodeInputRef.current.value,
        isbn: isbnInputRef.current.value,
      };
  
      axios.post(url, book).then((res) => {
        if(res.data.length > 0) {
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
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" ref={titleInputRef} />
          </div>
          <div>
            <label htmlFor="year">Year: </label>
            <input type="text" id="year" ref={yearCodeInputRef} />
          </div>
          <div>
            <label htmlFor="isbn"> ISBN: </label>
            <input type="text" id="isbn" ref={isbnInputRef} />
          </div>
          <button>Add Book</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddBookForm;