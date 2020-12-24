import withAdmin from "../../withAdmin";
import axios from "axios";
import {useState, useEffect} from "react";
import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Link from "next/Link";
import styles from "./list.module.css";


function List() {

  const [state, setstate] = useState(
    {
      error:"",
      success:"",
      categories:[]
    }
  )

    const {error, success, categories} = state
    useEffect(() => {

      loadCategories()

    }, [])

    const loadCategories = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/categories`)
      setstate({...state, categories: response.data})
    }

const listCategories = () =>
  categories.map((c, i) => (
    // On click users are directed
    // to a page with category slug in the url
    <Link href={`/links/${c.slug}`}>
      <a className={`col-md-3 ${styles.item}`}>
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
    <div className="row">
      <div className={styles.row}>
        {listCategories()}
        <br/>
      </div>
    </div>
  )
}

export default withAdmin(List)
