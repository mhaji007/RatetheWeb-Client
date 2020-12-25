// Page for displaying user dashboard

import withUser from "../withUser"

const User = ({ user, userLinks }) => (
  <>
    <h1>{JSON.stringify(user)}</h1>
    <h1>{JSON.stringify(userLinks)}</h1>
  </>
);


export default withUser (User);



// Without use of withUser/withAdmin HOC, getInitialProps
// is necessary on every page we would like to have role-based
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
