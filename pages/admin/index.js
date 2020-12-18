import withAdmin from "../withUser";

const User = ({ user }) => <h1>{JSON.stringify(user)}</h1>;

export default withAdmin(User);
