import Link from "next/Link";



const Nav = () => (
  <ul className="nav bg-dark justify-content-between">
    <li className="nav-item ">
      <Link href="/">
        <a className="nav-link text-white">Home</a>
      </Link>
    </li>
    <div className="d-flex ">
      <li className="nav-item">
        <Link href="./login">
          <a className="nav-link text-white">Login</a>
        </Link>
      </li>
      <li className="nav-item ">
        <Link href="./register">
          <a className="nav-link text-white">Register</a>
        </Link>
      </li>
    </div>
  </ul>
);



  export default Nav


