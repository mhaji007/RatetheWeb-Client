// Page responsible for displaying
// a single category information
// along with all the associated links
import { useState } from "react";
import axios from "axios";
import Link from "next/Link";
import renderHTML from "react-render-html";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";

function Links({ query, category, links, totalLinks, linksLimit, linkSkip }) {
  // State for storing all links.
  // The reason for storing links in state instead of mapping through links,
  // is that when we have load more button is clicked, we end up with more links
  // so we need to store all of them in state
  const [allLinks, setAllLinks] = useState(links);
  // State for storing link limits. defaults to linkslimit
  const [limit, setLimit] = useState(linksLimit);
  // State for storing number of links to be skipped on each request
  const [skip, setSkip] = useState(0);
  // State for storing number of links. Used to determined whether there
  // is a need for further request
  const [size, setSize] = useState(totalLinks);

  const handleClick = async (linkId) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/click-count`,
      { linkId }
    );
    loadUpdatedLinks();
  };
  // fetch all the post
  const loadUpdatedLinks = async () => {
    // Refetch the link again to display the updated
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/category/${query.slug}`
    );
    setAllLinks(response.data.links);
  };

  const listOfLinks = () =>
    allLinks.map((l, i) => (
      <div
        className="row alert border bg-light alert-secondary p-2 rounded-1"
        key={i}
      >
        <div className="col-md-8" onClick={(e) => handleClick(l._id)}>
          {/* a instead of Link since this link
           might reference an external resourcce */}
          <a href={l.url} target="_blank">
            <h5 className="pt-2">{l.title}</h5>
            {/* Display link */}
            <h6
              className="pt-2 text-primary"
              style={{ fontSize: "14px" }}
            >
              {l.url}
            </h6>
          </a>
        </div>
        {/* Display link meta information */}
        <div className="col-md-4 pt-2">
          <span className="float-right">
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
            <span
              className="badge badge-pill badge-primary bg-secondary ml-1 "
              key={i}
            >
              {c.name}
            </span>
          ))}
          <span className="badge badge-pill badge-primary bg-primary ml-1 float-right ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-index-thumb"
              viewBox="0 0 16 16"
            >
              <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z" />
            </svg>{" "}
            {l.clicks ? l.clicks : 0} clicks
          </span>
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
    // Add new links returned from request while preserving the existing links
    setAllLinks([...allLinks, ...response.data.links]);
    console.log("allLinks", allLinks);
    console.log("response.data.links.length", response.data.links.length);
    // Store the updated total number of links for the next request
    // If user clicks one moew time we need to recalculate how many to skip
    setSize(response.data.links.length);
    // Store the updated skip value calculated here for the next request
    setSkip(toSkip);
  };

  // ================ load more button instead of inifinite scroll ==================================== //

  // Logic for displaying load more button
  // const loadMoreButton = () => {
  //   return (
  //     // If total link number is > 0
  //     size > 0 &&
  //     // And is greater than limit
  //     size >= limit && (
  //       <button onClick={loadMore} className="btn btn-outline-primary btn-md">
  //         Load more
  //       </button>
  //     )
  //   );
  // };

  // ==================================================================================================== //

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

          {/* // ================ load more button instead of inifinite scroll ==================================== // */}
          {/* Display load more button */}
          {/* <div className="text-center pt-4 pb-5">{loadMoreButton()}</div> */}
          {/* // ============================================================= ==================================== // */}

          <InfiniteScroll
            className="text-center mx-auto"
            pageStart={0}
            loadMore={loadMore}
            hasMore={size > 0 && size >= limit}
            loader={
              <div className="loader" key={0}>
                <img src="/loader.gif" alt="loader" />
              </div>
            }
          ></InfiniteScroll>
        </div>
        <div className="col-md-4">
          <h2 className="lead">Most popular in {category.name}</h2>
          <p>Show popular links</p>
        </div>
      </div>
    </>
  );
}
// Two ways to access the slug here:
// either through using withRouter HOC client-side and making the route
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
