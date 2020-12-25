// Page responsible for displaying all
// categories fetched from server
// categoriers are fetched serverside
// and are made avaialbe on page visit
import axios from "axios";
import styles from "./index.module.css";
import Link from "next/Link";

const Home = ({ categories }) => {
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
