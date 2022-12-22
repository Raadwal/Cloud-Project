import { Link } from "react-router-dom";

import classes from "./ReportsNavigation.module.css";

function ReportsNavigation() {
  return (
    <nav className={classes.formNav}>
        <Link to="/reports/show/users">Show User</Link>
        <Link to="/reports/show/books">Show Book</Link>
        <Link to="/reports/show/authors">Show Author</Link>
        <Link to="/reports/show/tags">Show Tag</Link>
        <Link to="/reports/author/show/books">Show Authors Books</Link>
        <Link to="/reports/book/show/tags">Show Books Tags</Link>
        <Link to="/reports/user/show/reviews">Add Users Reviews</Link>
    </nav>
  );
}

export default ReportsNavigation;