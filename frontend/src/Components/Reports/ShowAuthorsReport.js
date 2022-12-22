import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ShowAuthorsReport() {
  const [authors, getAuthors] = useState([]);
  const url = "http://127.0.0.1:3000/author";

  const getAllAuthors = () => {
    axios.get(url).then((res) => {  
      getAuthors(res.data);
    });
  };

  const deleteAuthor = (id) => {
    axios.delete(url + "/" + id).then((res) => {
      getAuthors(prevState => {
        return prevState.filter((user) => user._id !== id);
      });
    });
  };

  useEffect(() => getAllAuthors(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w25}>Author ID:</span>
          <span className={classes.w20}>Name</span>
          <span className={classes.w20}>Surname</span>
          <span className={classes.w15}>Age</span>
          <span className={classes.w20}>Action</span>
        </div>
        <div className={classes.dataWrapper}>
          {authors.map((author) => (
            <div key={author._id} className={classes.element}>
              <span className={classes.w25}>{author._id}</span>
              <span className={classes.w20}>{author.name}</span>
              <span className={classes.w20}>{author.surname}</span>
              <span className={classes.w15}>{author.age}</span>
              <span className={classes.w20}> 
                <button onClick={() => {deleteAuthor(author._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowAuthorsReport;