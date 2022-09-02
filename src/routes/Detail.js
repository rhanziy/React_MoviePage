import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./detail.module.css";

function Detail(){
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [time, setTime] = useState(0);
  const [rating, setRating] = useState(0);
  const getMovie = async() => {
    const json = await(
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
    setMovie(json.data.movie);
    timeHandler(json.data.movie.runtime);
    ratingHandle(json.data.movie.rating);
    setLoading(false);
  }
  const timeHandler = (time) => {
    if(time === 0){
      setTime(110);
    } else {
      setTime(time);
    }
  }
  const ratingHandle = (rat) => {
    if(rat % 1 === 0){
      setRating(rat + ".0");
    } else {
      setRating(rat);
    }
  }

  useEffect(()=>{
    getMovie();
  }, []);

  return (
    <div>
      {loading ? null : 
       <div>
        <img className={styles.bg} src={movie.background_image}/>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>{movie.title} ㅡ {movie.year}</h2>
            <ul>
              {movie.genres.map(g => <li key={g}>{g} </li>)}
            </ul>
            <h3>⭐ {rating} ㅣ {time}분</h3>
            <p>{movie.description_full}</p>
          </div>
          <img src={movie.large_cover_image}/>
        </div>
       </div>
      }
    </div>
  );
}

export default Detail;