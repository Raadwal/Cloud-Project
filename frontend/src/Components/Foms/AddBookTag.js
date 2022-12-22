import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddBookTag() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/book";
  
    const bookIdInputRef = useRef();
    const tagIdInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const data = {
        bookId: bookIdInputRef.current.value,
        tagId: tagIdInputRef.current.value,
      };
  
      const newUrl = url + "/" + data.bookId + "/tag/" + data.tagId; 

      axios.post(newUrl, data).then((res) => { 
        console.log(newUrl);   
        if(res.data.book.length > 0 && res.data.tag.length > 0) {
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
            <label htmlFor="bookId">Book ID: </label>
            <input type="text" id="bookId" ref={bookIdInputRef} />
          </div>
          <div>
            <label htmlFor="tagId">Tag ID: </label>
            <input type="text" id="tagId" ref={tagIdInputRef} />
          </div>

          <button>Add Books Tag</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddBookTag;