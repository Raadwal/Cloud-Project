import { useEffect, useState , useRef} from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import formClasses from "./../Foms/AddForm.module.css"
import reportsClasses from "./Reports.module.css";

function ShowUsersReviews() {
  const [reviews, getReviews] = useState([]);
  const url = "http://127.0.0.1:3000/user";

  const userIdInputRef = useRef();

  const getAllReviews = (id) => {  
    const newUrl = url + "/" + id + "/reviews"

    axios.get(newUrl).then((res) => {
      getReviews(res.data);
    });
  };

  const deleteReview = (id) => {
    const newUrl = url + "/" + userIdInputRef.current.value + "/review/" + id 

    axios.delete(newUrl).then((res) => {
        getAllReviews(userIdInputRef.current.value);
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    const userId = userIdInputRef.current.value;

    getAllReviews(userId);
  }

  useEffect(() => getAllReviews(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
      <form className={formClasses.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="userId">User ID: </label>
            <input type="text" id="userId" ref={userIdInputRef}/>
          </div>
          <button>Find reviews</button>
        </form>
        <div className={reportsClasses.title}>
          <span className={reportsClasses.w25}>Book ID</span>
          <span className={reportsClasses.w20}>Title</span>
          <span className={reportsClasses.w20}>Year</span>
          <span className={reportsClasses.w10}>Score</span>
          <span className={reportsClasses.w25}>Action</span>
        </div>
        <div className={reportsClasses.dataWrapper}>
          {reviews.map((review) => (
            <div key={review.book_id} className={reportsClasses.element}>
              <span className={reportsClasses.w25}>{review.book._id}</span>
              <span className={reportsClasses.w20}>{review.book.title}</span>
              <span className={reportsClasses.w20}>{review.book.year}</span>
              <span className={reportsClasses.w10}>{review.review.score}</span>
              <span className={reportsClasses.w25}> 
                <button onClick={() => {deleteReview(review.book._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowUsersReviews;