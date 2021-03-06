// Component that determines the layout of all pages
// Wraps navigation and any children passed to it
// used in _app to all pages


import React from 'react';
import Nav from './Nav'
import Router from 'next/router'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Layout = ({children}) => {
 return (
   <div>
     <Nav />
     <div className="container pt-5 pb-5"> {children}</div>
   </div>
 );
};

export default Layout;
