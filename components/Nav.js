import Link from "next/Link"


const Nav = () => (
  <ul className="nav nav-tabs  bg-dark">
    <li className="nav-item ">
      <Link href="/">
        <a className="nav-link text-white">Home</a>
      </Link>
    </li>
    <li className="nav-item ">
      <Link href="./login">
        <a className="nav-link text-white">Login</a>
      </Link>
    </li>
    <li className="nav-item ">
      <Link href="./register">
        <a className="nav-link text-white">Register</a>
      </Link>
    </li>
  </ul>
);



  export default Nav


