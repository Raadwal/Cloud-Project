import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <Link to="/">Books Recommendations</Link>
                <Link to="/forms">Add Data</Link>
                <Link to="/reports">Show Data</Link>
            </nav>
        </header>
    );
}

export default MainNavigation;