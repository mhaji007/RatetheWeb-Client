import axios from "axios";
import { getCookie } from "../helpers/auth";

const withAdmin = (Page) => {
  const WithAdminUser = (props) => <Page {...props} />;
  WithAdminUser.getInitialProps = async (context) => {
    const token = getCookie("token", context.req);
    let user = null;

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
      };
    }
  };
  return WithAdminUser;
};
export default withAdmin;
