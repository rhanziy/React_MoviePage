import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,} from "@fortawesome/free-solid-svg-icons";
import { arrayOf } from "prop-types";

function Home(){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const getMovies = async() => {
    const json = await( 
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    getGenres(json.data.movies);
    setNowMovies(json.data.movies);
    setLoading(false);
  }
  
  const getGenres = (movies) => {
    const genRes = [];
    movies.forEach(movie => {
      movie.genres.forEach(g =>{
        if(genRes.indexOf(g) === -1) 
        genRes.push(g);
      });
    });
    genRes.sort();
    setGenres(genRes);
  }

  const searchHandler = (e) => {
    const value = e.target.value;
    if(value === "all") {
      setNowMovies(movies);
    } else {
        setNowMovies((current) => current =
        movies.filter(movie => movie.genres.indexOf(value) > -1
      ));
    }
  }

  useEffect(()=>{
    getMovies();
  }, []);

  return (
    <div>
      { loading ? 
        <h1 className={styles.load}>Loading  <FontAwesomeIcon icon={faSpinner} pulse/></h1> : 
        <div>
          <div className={styles.sel}>
            <select className={styles.selBox} onChange={searchHandler}>
              <option value="all">Choosing Genre</option>
              {genres.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className={styles.container}>
            {nowMovies.map(
              movie => 
              <Movie 
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image} 
                year={movie.year}
                genres={movie.genres}
              />
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;