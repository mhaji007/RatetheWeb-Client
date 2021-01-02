// Page responsible for displaying all
// categories fetched from server
// categoriers are fetched serverside
// and are made avaialbe on page visit
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Link from "next/Link";
import moment from "moment";

const Home = ({ categories }) => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/link/popular`
    );
    // console.log(response);
    setPopular(response.data);
  };

  const handleClick = async (linkId) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/click-count`,
      { linkId }
    );
    loadPopular();
  };

  const listOfLinks = () =>
    popular.map((l, i) => (
      <div
        key={i}
        className="row alert border bg-light alert-secondary p-2 rounded-1"
      >
        <div className="col-md-8" onClick={() => handleClick(l._id)}>
          <a href={l.url} target="_blank">
            <h5 className="pt-2">{l.title}</h5>
            <h6 className="pt-2 text-primary" style={{ fontSize: "12px" }}>
              {l.url}
            </h6>
          </a>
        </div>

        <div className="col-md-4 pt-2">
          <span className="float-right text-nowrap mb-1">
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
              key={i}
              className="badge badge-pill badge-primary bg-secondary ml-1"
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

  const listCategories = () =>
    categories.map((c, i) => (
      // On click users are directed
      // to a page with category slug in the url
      <Link href={`/links/${c.slug}`}>
        <a className={`col-md-3 ${styles.item}`}>
          <div>
            <div className="row">
              <div className="col-md-4 my-auto">
                <img
                  src={c.image && c.image.url}
                  className={styles.thumbnail}
                  alt={c.name}
                />
              </div>
              <div className="col-md-8 my-auto">
                <p className={styles.topic}>{c.name}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold text-center">
            Browse the best learning content on the web
          </h1>
        </div>
      </div>

      <div className={styles.row}>{listCategories()}</div>

      <div className="row pt-5">
        <h2 className="font-weight-bold pb-3">Trending</h2>
        <div className="col-md-12 overflow-hidden">{listOfLinks()}</div>
      </div>
    </>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories`);
  return {
    categories: response.data,
  };
};

export default Home;
