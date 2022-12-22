import axios from "axios";
import { useRef, useState } from "react";

import FormsNavigation from "../Layout/FormsNavigation";
import classes from "./AddForm.module.css";

function AddUserForm() {
    const [response, setResponse] = useState("");
    const url = "http://127.0.0.1:3000/user";
  
    const nameInputRef = useRef();
    const surnameCodeInputRef = useRef();
    const nicknameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const user = {
        name: nameInputRef.current.value,
        surname: surnameCodeInputRef.current.value,
        nicknameInputRef: nicknameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };
  
      axios.post(url, user).then((res) => {
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
            <label htmlFor="nickname"> Nickname: </label>
            <input type="text" id="nickname" ref={nicknameInputRef} />
          </div>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input type="text" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
          <button>Add User</button>
        </form>
        <div className={classes.result}>{response}</div>
      </div>
    );
  }

export default AddUserForm;