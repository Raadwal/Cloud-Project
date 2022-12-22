import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../Layout/ReportsNavigation";

import classes from "./Reports.module.css";

function ShowUsersReport() {
  const [users, getUsers] = useState([]);
  const url = "http://127.0.0.1:3000/user";

  const getAllUsers = () => {
    axios.get(url).then((res) => {
      getUsers(res.data);
    });
  };

  const deleteUser = (id) => {
    axios.delete(url + "/" + id).then((res) => {
      getUsers(prevState => {
        return prevState.filter((user) => user._id !== id);
      });
    });
  };

  useEffect(() => getAllUsers(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w25}>Users ID:</span>
          <span className={classes.w15}>Name</span>
          <span className={classes.w15}>Surname</span>
          <span className={classes.w15}>Nickname</span>
          <span className={classes.w15}>Email</span>
          <span className={classes.w15}>Action</span>
        </div>
        <div className={classes.dataWrapper}>
          {users.map((user) => (
            <div key={user._id} className={classes.element}>
              <span className={classes.w25}>{user._id}</span>
              <span className={classes.w15}>{user.name}</span>
              <span className={classes.w15}>{user.surname}</span>
              <span className={classes.w15}>{user.nickname}</span>
              <span className={classes.w15}>{user.email}</span>
              <span className={classes.w15}> 
                <button onClick={() => {deleteUser(user._id)}}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowUsersReport;