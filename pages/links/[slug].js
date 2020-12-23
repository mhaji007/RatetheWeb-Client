import axios from "axios";
import Link from "next/Link";

import React from "react";

function Links({ query, category, links, totalLinks, linksLimit, linkSkip }) {
  return (
    <div className="row">
      <div className="col-md-4">{JSON.stringify(category)}</div>
      <div className="col-md-4">{JSON.stringify(links)}</div>
    </div>
  );
}
// Two ways to access the slug here
// Either using withRouter and making the route
// props availabe on component or by destructuring
// query (slug) from context in getInitialProps
Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 1;

  // retruns a single category and all the related links
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/category/${query.slug}`,
    { skip, limit }
  );

  console.log("limit on client ===>", limit)

  return {
    // return query
    // so we have access to slug
    // in component
    query,
    category: response.data.category,
    links: response.data.links,
    totalLinks: response.data.links.length,
    linksLimit: limit,
    linkSkip: skip,
  };
};

export default Links;
