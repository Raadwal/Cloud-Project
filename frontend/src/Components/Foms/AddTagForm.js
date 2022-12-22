import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddTagForm() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/tag";
  
    const nameInputRef = useRef();;
  
    function submitHandler(event) {
      event.preventDefault();
  
      const tag = {
        name: nameInputRef.current.value,
      };
  
      axios.post(url, tag).then((res) => {
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
            <label htmlFor="tag">Name: </label>
            <input type="text" id="tag" ref={nameInputRef} />
          </div>
          <button>Add Tag</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddTagForm;