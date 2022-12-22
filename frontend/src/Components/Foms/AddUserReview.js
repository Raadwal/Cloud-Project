import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddUserReview() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/user";
  
    const userIdInputRef = useRef();
    const bookIdInputRef = useRef();
    const scoreInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();

      const data = {
        userId: userIdInputRef.current.value,
        bookId: bookIdInputRef.current.value,
        score: scoreInputRef.current.value
      };
  
      const newUrl = url + "/" + data.userId + "/rate";

      axios.post(newUrl, data).then((res) => {    
        if(res.data.user.length > 0 && res.data.book.length > 0) {
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
            <label htmlFor="userId">User ID: </label>
            <input type="text" id="userId" ref={userIdInputRef} />
          </div>
          <div>
            <label htmlFor="bookId">Book ID: </label>
            <input type="text" id="bookId" ref={bookIdInputRef} />
          </div>
          <div>
            <label htmlFor="score">Score: </label>
            <input type="number" min="0" max="10" id="score" ref={scoreInputRef} />
          </div>
          <button>Add User Review</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddUserReview;