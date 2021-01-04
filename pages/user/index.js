// Page for displaying user dashboard

import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import moment from "moment";

import withUser from "../withUser";

const User = ({ user, userLinks, token }) => {

 const confirmDelete = (e, id) => {
   e.preventDefault();
   // console.log('delete > ', slug);
   let answer = window.confirm("Are you sure you want to delete this link?");
   if (answer) {
     handleDelete(id);
   }
 };

 const handleDelete = async (id) => {
   console.log("delete link", id);
   try {
     const response = await axios.delete(`${process.env.NEXT_PUBLIC_API}/link/${id}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     console.log("Link delete success ", response);
     Router.replace("/user");
   } catch (error) {
     console.log("Link delete ", error);
   }
 };


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
          <span className="float-right text-nowrap">
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}
          </span>
        </div>
        <div className="col-md-12">
          <span className="badge badge-pill badge-primary bg-secondary">
            {l.type}
          </span>
          <span className="badge badge-pill badge-primary bg-secondary ml-1">
            {l.medium}
          </span>

          {l.categories.map((c, i) => (
            <span
              className="badge badge-pill badge-primary bg-secondary ml-1 "
              key={i}
            >
              {c.name}
            </span>
          ))}
          <span className="badge badge-pill badge-primary bg-primary ml-1 float-right ">

            {l.clicks ? l.clicks: 0} clicks
          </span>
          {/* l._id is used instead of slug because
          we need the id to make a request to server and prepopulate
          the form fields with the current values */}
          <Link href={`/user/link/${l._id}`}>
            <span className="badge border border-info text-info float-right ml-2 ">Update</span>
          </Link>

          <span
            onClick={(e) => confirmDelete(e, l._id)}
            className="badge border border-danger text-danger float-right"
          >
            Delete
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
