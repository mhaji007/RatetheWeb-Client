// Admin page
// Page for displaying admin dashboard

import withAdmin from "../withUser";
import Link from "next/Link";

const User = ({user}) => {
  return(
    <>
      <h1>Admin Dashboard</h1>

      <br />
      <div className="row">
        <div className="col-md-4">
          <ul className="nav flex-column">
            <li className="nav-item">
              {/*CSS for React Quill sometimes does not load
              until page is refreshed, in such situations we can
              do away with enclosing Link tags and use "a" tags instead */}
              <Link href="/admin/category/create">
                <a className="nav-link"> Create Category</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/category/list">
                <a className="nav-link"> Update/Delete Category</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/link/list">
                <a className="nav-link"> Update/Delete Link</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/user/profile/update">
                <a className="nav-link"> Update Profile</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-8"></div>
      </div>
    </>
  );
};

export default withAdmin(User);
