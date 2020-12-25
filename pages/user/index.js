// Page for displaying user dashboard

import Layout from "../../components/Layout";
import Link from "next/Link";
import axios from "axios";
import moment from "moment";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

const User = ({ user, userLinks, token }) => {
  const listOfLinks = () =>
    userLinks.map((l, i) => (
      <div
        key={i}
        className="row alert border bg-light alert-secondary p-2 rounded-1"
      >
        <div className="col-md-8">
          <a href={l.url} target="_blank">
            <h5 className="pt-2">{l.title}</h5>
            <h6 className="pt-2 text-primary" style={{ fontSize: "14px" }}>
              {l.url}
            </h6>
          </a>
        </div>
        <div className="col-md-4 pt-2">
          <span className="float-right">
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}
          </span>
        </div>
      </div>
    ));

  return (
    <>
      {/* <h1>
        {user.name}'s dashboard{" "}
        {user.role} dashboard{" "}
      </h1>
      <hr /> */}
      <div className="row">
        <div className="col-md-4">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/user/link/create">
                <a className="nav link">Submit a link</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/user/profile/update">
                <a className="nav link">Update profile</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-8">
          <h2>Your links</h2>
          <hr />
          {listOfLinks()}
        </div>
      </div>
    </>
  );
};

export default withUser(User);




// Without use of withUser/withAdmin HOC, getInitialProps
// is necessary on every page where we would like to have role-based
// authentication like below:

// Make sure user has logged in with valid token

// import axios from "axios";
// import { getCookie } from "../../helpers/auth";
// import withUser from "../withUser";

// const User = ({ user }) => <h1>{JSON.stringify(user)}</h1>;

// User.getInitialProps = async (context) => {
//   const token = getCookie("token", context.req);

//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/user`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//         contentType: "application/json",
//       },
//     });
//     return { user: response.data };
//   } catch (error) {
//     // console.log(error);
//      //Not logged in or is not authorized (expired token, etc.)
//     if (error.response.status === 401) {
//       return { user: "no user" };
//     }
//   }
// };
// export default User;
