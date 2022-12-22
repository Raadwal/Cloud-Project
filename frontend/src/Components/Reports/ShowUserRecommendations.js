import { useEffect, useState , useRef} from "react";
import axios from "axios";

import formClasses from "./../Foms/AddForm.module.css"
import reportsClasses from "./Reports.module.css";

function ShowUserRecommendations() {
  const [recommendations, getRecommendations] = useState([]);
  const url = "http://127.0.0.1:3000/user";

  const userIdInputRef = useRef();

  const getAllRecommendations = (id) => {  
    const newUrl = url + "/" + id + "/recommendations"

    axios.get(newUrl).then((res) => {
      getRecommendations(res.data);
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    const userId = userIdInputRef.current.value;

    getAllRecommendations(userId);
  }

  useEffect(() => getAllRecommendations(), []);

  return (
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
          <span className={reportsClasses.w25}>Title</span>
          <span className={reportsClasses.w20}>Year</span>
          <span className={reportsClasses.w20}>Avg Score</span>
          <span className={reportsClasses.w20}>Reviews Number</span>
        </div>
        <div className={reportsClasses.dataWrapper}>
          {recommendations.map((recommendation) => (
            <div key={recommendation.book._id} className={reportsClasses.element}>
              <span className={reportsClasses.w25}>{recommendation.book._id}</span>
              <span className={reportsClasses.w25}>{recommendation.book.title}</span>
              <span className={reportsClasses.w20}>{recommendation.book.year}</span>
              <span className={reportsClasses.w20}>{Math.round((recommendation.score + Number.EPSILON) * 100) / 100}</span>
              <span className={reportsClasses.w20}>{recommendation.reviewsCount.low}</span>
            </div>
          ))}
        </div>
      </div>
  );
}

export default ShowUserRecommendations;