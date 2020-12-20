// Admin page
// after log in users with role of admin
// are directed to this page

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
              <Link href="/admin/category/create">
                <a className="nav-link"> Create Category</a>
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
