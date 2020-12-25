// Used to wrap pages we want to restrict access to only logged in user
// with role of admin (admin protected route)
// Used for serverside authentication.

import axios from "axios";
import { getCookie } from "../helpers/auth";
// Wrapped page is sent in as an argument
const withAdmin = (Page) => {
  // WithAdminUser will render the page with props (user information on successs)
  // made available through getInitialProps
  const WithAdminUser = (props) => <Page {...props} />;
  // req is available on context
  WithAdminUser.getInitialProps = async (context) => {
    // Retrieve cookie
    const token = getCookie("token", context.req);
    let user = null;
    let userLinks = [];

    if (token) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/admin`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              contentType: "application/json",
            },
          }
        );
        user = response.data;
        userLinks = response.data.links;
      } catch (error) {
        // console.log(error);
        if (error.response.status === 401) {
          user = null;
        }
      }
    }
    if (user === null) {
      // Redirect
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
        userLinks,
      };
    }
  };
  return WithAdminUser;
};
export default withAdmin;
