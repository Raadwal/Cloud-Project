import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ShowTagsReport() {
  const [tags, getTags] = useState([]);
  const url = "http://127.0.0.1:3000/tag";

  const getAllTags = () => {
    axios.get(url).then((res) => {
      getTags(res.data);
    });
  };

  const deleteTag = (id) => {
    axios.delete(url + "/" + id).then((res) => {
      getTags(prevState => {
        return prevState.filter((user) => user._id !== id);
      });
    });
  };

  useEffect(() => getAllTags(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Tag ID:</span>
          <span className={classes.w33}>Name</span>
          <span className={classes.w33}>Action</span>
        </div>
        <div className={classes.dataWrapper}>
          {tags.map((tag) => (
            <div key={tag._id} className={classes.element}>
              <span className={classes.w33}>{tag._id}</span>
              <span className={classes.w33}>{tag.name}</span>
              <span className={classes.w33}> 
                <button onClick={() => {deleteTag(tag._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowTagsReport;