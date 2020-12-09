import React from 'react';
import Nav from './Nav'

const Layout = ({children}) => {
 return (
   <div>
     <Nav />
     <div className="container pt-5 pb-5"> {children}</div>
   </div>
 );
};

export default Layout;
