import axios from "axios";
import { getCookie } from "../../helpers/auth";

const User = ({ user }) => <h1>{JSON.stringify(user)}</h1>;

User.getInitialProps = async (context) => {
  const token = getCookie("token", context.req);

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    });
    return { user: response.data };
  } catch (error) {
    // console.log(error);
    if (error.response.status === 401) {
      return { user: "no user" };
    }
  }
};

export default User;
