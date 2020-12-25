// Navigation component that appears across all pages
// used in Layout component
// Role-based redirect is implemented here

import Link from "next/Link";
import { isAuth, logOut } from "../helpers/auth";
import styles from "./Nav.module.css"

const Nav = () => (
  <ul
    className="nav bg-dark justify-content-between"
    style={{ backgroundColor: "black !important" }}
  >
    <div className="d-flex">
      <li className="nav-item ">
        <Link href="/">
          <a className="nav-link text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
              />
              <path
                fill-rule="evenodd"
                d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </a>
        </Link>
      </li>
      <li className="nav-item my-auto">
        <Link href="/user/link/create">
          <a className={styles.submit}>
            <strong className="pr-2">+</strong>
            Submit a Link
          </a>
        </Link>
      </li>
    </div>
    <div className="d-flex my-auto ">
      {/* If not logged in display login and register links */}
      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link href="/login">
              <a className="nav-link text-white">LOGIN</a>
            </Link>
          </li>
          <li className="nav-item ">
            <Link href="/register">
              <a className="nav-link text-white">REGISTER</a>
            </Link>
          </li>
        </>
      )}

      {/* If logged in redirect based on role */}

      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item ">
          <Link href="/admin">
            <a className="nav-link text-white my-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-person-check"
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                <path
                  fill-rule="evenodd"
                  d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
              {/* {isAuth().name}{" "}
               */}
            </a>
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item  my-auto ">
          <Link href="/user">
            <a className="nav-link text-white">{isAuth().name}</a>
          </Link>
        </li>
      )}
      {/* Only display logout if users are logged in */}
      {isAuth() && (
        <li className="nav-item my-auto ">
          <a className="nav-link text-white" onClick={logOut}>
            LOGOUT
          </a>
        </li>
      )}
    </div>
  </ul>
);

export default Nav;
