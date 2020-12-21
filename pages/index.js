import axios from "axios";
import styles from "./index.module.css";
import Link from "next/Link";

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((c, i) => (
      <Link href="/">
        <a className={`col-md-3 ${styles.item}`} >
          <div>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={c.image && c.image.url}
                  className={styles.thumbnail}
                  alt={c.name}
                />
              </div>
              <div className="col-md-8 mt-2">
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
            Browse Websites for inspiration
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
