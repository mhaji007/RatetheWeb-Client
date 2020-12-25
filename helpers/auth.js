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
  // This implementation only runs on browser
  // if (process.browser) {
  //   return cookie.get(key);
  // }

  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

// Takes in req to check cookie availablity
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
  let tokenValue = token.split("=")[1];
  console.log("getCookieFromServer", tokenValue);
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
  removeCookie("token");
  removeLocalStorage("user");
  Router.push("/login");
};
