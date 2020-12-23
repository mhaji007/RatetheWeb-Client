// Page responsible for displaying
// a single category information
// along with all the associated links
import { useState } from "react";
import axios from "axios";
import Link from "next/Link";
import renderHTML from "react-render-html";
import moment from "moment";

function Links({ query, category, links, totalLinks, linksLimit, linkSkip }) {
  // State for storing all links.
  // The reason for storing links in state instead of mapping through links,
  // is that when we have load more button is clicked, we end up with more links
  // so we need to store all of them in state
  const [allLinks, setAllLinks] = useState(links);
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalLinks);

  const listOfLinks = () =>
    allLinks.map((l, i) => (
      <div className="row alert border bg-light alert-secondary p-2 rounded-1">
        <div className="col-md-8">
          {/* a instead of Link since this link
           might reference an external resourcce */}
          <a href={l.url} target="_blank">
            <h5 className="pt-2">{l.title}</h5>
            {/* Display link */}
            <h6 className="pt-2 text-primary" style={{ fontSize: "14px" }}>
              {l.url}
            </h6>
          </a>
        </div>
        {/* Display link meta information */}
        <div className="col-md-4 pt-2">
          <span className="pull-right">
            {moment(l.createdAt).fromNow()} by {l.postedBy.name}
          </span>
        </div>
        <div className="col-md-12">
          <span className="badge badge-pill badge-primary bg-secondary">
            {l.type}
          </span>
          <span className="badge badge-pill badge-primary bg-secondary ml-1">
            {l.medium}
          </span>

          {l.categories.map((c, i) => (
            <span className="badge badge-pill badge-primary bg-secondary ml-1 ">
              {c.name}
            </span>
          ))}
        </div>
      </div>
    ));
  // Function for loading more links
  const loadMore = async () => {
    // How many to skip
    let toSkip = skip + limit;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/category/${query.slug}`,
      {
        skip: toSkip,
        limit,
      }
    );
    setAllLinks([...allLinks, ...response.data.links]);
    console.log("allLinks", allLinks);
    console.log("response.data.links.length", response.data.links.length);
    // Store the updated total number of links for the next request
    setSize(response.data.links.length);
    // Store the updated skip value calculated here for the next request
    setSkip(toSkip);
  };

  // Logic for displaying load more button
  const loadMoreButton = () => {
    return (
      // if total links is > 0
      size > 0 &&
      // and is greater than limit
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-md">
          Load more
        </button>
      )
    );
  };

  return (
    <>
      <div className="row ">
        {/* Display content */}
        <div className="col-md-8">
          {/* Category name */}
          <h1 className="">{category.name} - Links</h1>
          {/* Category content - Rich text editor content (react quill content) - html content */}
          <div className=" lead  alert  bg-light pt-4 rounded-0">
            {renderHTML(category.content || "")}
          </div>
        </div>

        {/* Category image */}
        <div className="col-md-4">
          <img
            src={category.image.url}
            alt={category.name}
            style={{ width: "auto", maxHeight: "200px" }}
          />
        </div>
      </div>
      <br />
      {/* Display links */}
      <div className="row">
        <div className="col-md-8">
          {listOfLinks()}
          <div className="text-center pt-4 pb-5">{loadMoreButton()}</div>
        </div>
        <div className="col-md-4">
          <h2 className="lead">Most popular in {category.name}</h2>
          <p>show popular links</p>
        </div>
      </div>
    </>
  );
}
// Two ways to access the slug here:
// either using withRouter HOC client-side and making the route
// props availabe on component (props.router.slug) or by destructuring
// query (slug) from context in getInitialProps server-side (context.query.slug)
Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 2;

  // retrun a single category and all the related links
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/category/${query.slug}`,
    { skip, limit }
  );

  return {
    // return query
    // so we have access to slug
    // in component
    query,
    category: response.data.category,
    links: response.data.links,
    // To determine when to stop
    // sending request for more links
    totalLinks: response.data.links.length,
    linksLimit: limit,
    linkSkip: skip,
  };
};

export default Links;
