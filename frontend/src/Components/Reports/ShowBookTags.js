import { useEffect, useState , useRef} from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import formClasses from "./../Foms/AddForm.module.css"
import reportsClasses from "./Reports.module.css";

function ShowBookTags() {
  const [tags, getTags] = useState([]);
  const url = "http://127.0.0.1:3000/book";

  const bookIdInputRef = useRef();

  const getAllTags = (id) => {  
    const newUrl = url + "/" + id + "/tags"
    console.log(newUrl)
    axios.get(newUrl).then((res) => {
      getTags(res.data);
    });
  };

  const deleteTag = (id) => {
    const newUrl = url + "/" + bookIdInputRef.current.value + "/tag/" + id 

    axios.delete(newUrl).then((res) => {
        getAllTags(bookIdInputRef.current.value);
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    const bookId = bookIdInputRef.current.value;
    getAllTags(bookId);
  }

  useEffect(() => getAllTags(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
      <form className={formClasses.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="bookId">Book ID: </label>
            <input type="text" id="bookId" ref={bookIdInputRef}/>
          </div>
          <button>Find tags</button>
        </form>
        <div className={reportsClasses.title}>
          <span className={reportsClasses.w33}>Tag ID</span>
          <span className={reportsClasses.w33}>Name</span>
          <span className={reportsClasses.w33}>Action</span>
        </div>
        <div className={reportsClasses.dataWrapper}>
          {tags.map((tag) => (
            <div key={tag._id} className={reportsClasses.element}>
              <span className={reportsClasses.w33}>{tag._id}</span>
              <span className={reportsClasses.w33}>{tag.name}</span>
              <span className={reportsClasses.w33}> 
                <button onClick={() => {deleteTag(tag._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowBookTags;