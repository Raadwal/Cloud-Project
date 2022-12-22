import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddAuthorForm() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/author";
  
    const nameInputRef = useRef();
    const surnameCodeInputRef = useRef();
    const ageInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const author = {
        name: nameInputRef.current.value,
        surname: surnameCodeInputRef.current.value,
        aghe: ageInputRef.current.value,
      };
  
      axios.post(url, author).then((res) => {
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
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div>
            <label htmlFor="surname">Surname: </label>
            <input type="text" id="surname" ref={surnameCodeInputRef} />
          </div>
          <div>
            <label htmlFor="Year"> Year: </label>
            <input type="text" id="Year" ref={ageInputRef} />
          </div>
          <button>Add Author</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddAuthorForm;