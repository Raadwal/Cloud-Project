import {Route, Routes} from "react-router-dom"

import Layout from "./Components/Layout/Layout";
import FormsNavigation from "./Components/Layout/FormsNavigation";
import ReportsNavigation from "./Components/Layout/ReportsNavigation";

import AddUserForm from "./Components/Foms/AddUserForm";
import AddBookForm from "./Components/Foms/AddBookForm";
import AddAuthorForm from "./Components/Foms/AddAuthorForm";
import AddTagForm from "./Components/Foms/AddTagForm";
import AddAuthorBook from "./Components/Foms/AddAuthorBook";
import AddBookTag from "./Components/Foms/AddBookTag";
import AddUserReview from "./Components/Foms/AddUserReview";

import ShowUsersReport from "./Components/Reports/ShowUsersReport";
import ShowBooksReport from "./Components/Reports/ShowBooksReport";
import ShowAuthorsReport from "./Components/Reports/ShowAuthorsReport";
import ShowTagsReport from "./Components/Reports/ShowTagsReport";
import ShowUsersReviews from "./Components/Reports/ShowUserReviews";
import ShowAuthorBooks from "./Components/Reports/ShowAuthorBooks";
import ShowBookTags from "./Components/Reports/ShowBookTags";

import ShowUserRecommendations from "./Components/Reports/ShowUserRecommendations";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ShowUserRecommendations />} />

        <Route path="/forms" element={<FormsNavigation />} />
        <Route path="/reports" element={<ReportsNavigation />} />

        <Route path="/forms/add/user" element={<AddUserForm />} />
        <Route path="/forms/add/book" element={<AddBookForm />} />
        <Route path="/forms/add/author" element={<AddAuthorForm />} />
        <Route path="/forms/add/tag" element={<AddTagForm />} />
        <Route path="/forms/author/add/book" element={<AddAuthorBook />} />
        <Route path="/forms/book/add/tag" element={<AddBookTag />} />
        <Route path="/forms/user/add/review" element={<AddUserReview />} />

        <Route path="/reports/show/users" element={<ShowUsersReport />} />
        <Route path="/reports/show/books" element={<ShowBooksReport />} />
        <Route path="/reports/show/authors" element={<ShowAuthorsReport />} />
        <Route path="/reports/show/tags" element={<ShowTagsReport />} />
        <Route path="/reports/author/show/books" element={<ShowAuthorBooks />} />
        <Route path="/reports/book/show/tags" element={<ShowBookTags />} />
        <Route path="/reports/user/show/reviews" element={<ShowUsersReviews />} />
        {/*<Link to="/reports/show/authors">Show Author</Link>
        <Link to="/reports/show/tags">Show Tag</Link>
        <Link to="/reports/author/show/books">Show Authors Books</Link>
        <Link to="/reports/book/show/tags">Show Books Tags</Link>
        <Link to="/reports/user/show/reviews">Add Users Reviews</Link>*/}

      </Routes>
    </Layout>
  );
}

export default App;
