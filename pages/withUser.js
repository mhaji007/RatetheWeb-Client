// Used to wrap pages we want to restrict access to only logged in user (user protected route)
// Used for serverside authentication

import axios from "axios";
import { getCookie } from "../helpers/auth";

// Wrapped page is sent in as an argument
const withUser = (Page) => {
  // WithAuthUser will render the page with props (user information on successs)
  // made available through getInitialProps
  const WithAuthUser = (props) => <Page {...props} />;
  // req is available on context
  WithAuthUser.getInitialProps = async (context) => {
    // Retrieve cookie
    const token = getCookie("token", context.req);
    // user (information) to be retrieved by request to backend
    let user = null;
    // all associated links with this user
    let userLinks = []

    if (token) {
      try {

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/user`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              contentType: "application/json",
            },
          }
        );
        // Retrieve user
        user = response.data.user;
        // Retrieve all asscoiated links
        userLinks = response.data.links
      } catch (error) {
        // console.log(error);
        if (error.response.status === 401) {
          user = null;
        }
      }
    }
    if (user === null) {
      // Redirect on serverside
      context.res.writeHead(302, {
        Location: "/",
      });
      context.res.end();
    } else {
      return {
        // Not all pages use getInitialProps.
        // If a page is using getInitialProps, then wait for that to resolve (e.g., fetching data, etc.) and return.
        // Otherwise, just return without waiting for getInitialProps
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
        user,
        token,
        userLinks
      };
    }
  };
  return WithAuthUser;
};
export default withUser;
