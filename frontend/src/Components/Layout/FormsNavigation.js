import { Link } from "react-router-dom";

import classes from "./FormsNavigation.module.css";

function FormsNavigation() {
  return (
      <nav className={classes.formNav}>
        <Link to="/forms/add/user">Add User</Link>
        <Link to="/forms/add/book">Add Book</Link>
        <Link to="/forms/add/author">Add Author</Link>
        <Link to="/forms/add/tag">Add Tag</Link>
        <Link to="/forms/author/add/book">Add Book to Author</Link>
        <Link to="/forms/book/add/tag">Add Tag to Book</Link>
        <Link to="/forms/user/add/review">Add Review to Book</Link>
      </nav>
  );
}

export default FormsNavigation;