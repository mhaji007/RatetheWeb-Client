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
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
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
    // do not only on local storage information since
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

}
