// Authentication helper methods for setting and removing cookies

import cookie from "js-cookie";
import Router from "next/router";

// Set in cookie
export const setCookie = (key, value) => {
  // Check if we are running in browser in next.js
  // equivalent to if window in client-side Javascript
  if (process.browser) {
    // Third argument is configuration
    // here expiration is set to 1 day
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// Remove from (browser) cookie
export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// Get cookie such as stored token
// will be useful when making request to server (to protected routes) with auth token
// At that time cookie is grabbed from the browser cookie and sent back to server
// in headers
// request has to be passed as ana argument
// for this function to run both on server
// and client.
export const getCookie = (key, req) => {
  // The following implementation only runs on browser
  // if a page is using getInitialProps and uses
  // this getCookie implementation to retrieve the token, when page is refreshed
  // cookie is lost since then we like first page load
  // getInitialProps runs on server

  // if (process.browser) {
  //   return cookie.get(key);
  // }

  // Check whether we are in browser or server
  // call getCookie from browser or server accordingly
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

// Takes in req to check cookie availablity
// Cookie if available, is sent by the browser
// in headers on each request
export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  // req.headaers.cookie looks something like the following:
  //G_AUTHUSER+H=0; token=eyJhci0iJUz1NiIsInc.......

  let token = req.headers.cookie
    .split(";")
    // Using example above the following first split returns
    // [G_AUTHUSER+H=0, token=eyJhci0iJUz1NiIsInc....... ]
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!token) {
    return undefined;
  }
  // The following second split returns
  // [token, eyJhci0iJUz1NiIsInc....... ]
  // [token, eyJhci0iJUz1NiIsInc....... ][1]
  // returns  eyJhci0iJUz1NiIsInc.......
  let tokenValue = token.split("=")[1];
  // console.log("getCookieFromServer", tokenValue);
  return tokenValue;
};

// Set in local storage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from local storage
export const removeLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and local storage during sign in

// response is an object contianing token
// and user info received when user successfully logs in
// The callback function (next) is used for
// redirecting user to another page after successfully setting cookie and local storage
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// Access user info from local storage
export const isAuth = () => {
  if (process.browser) {
    // Make sure token exists
    // do not rely only on local storage information since
    // there is more security risk to it
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const logOut = () => {
  // Redirect user to login first
  // and then remove credentials
  // from local storage and cookie

  // Note:
  // For some reason if cookie and
  // local storage content is removed
  // before performing a Router.push to
  // login, user is directed to register page
  // instead
  Router.push("/login");
  removeCookie("token");
  removeLocalStorage("user");
};
