import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//새로고침 없이도 유저를 다른페이지로 이동시켜주는 컴포넌트
import styles from "./movie.module.css"

function Movie({id, coverImg, genres}){
  return (
    <Link to ={`/movie/${id}`}>
      <div className={styles.box}>
        <div className={styles.flip}>
          <img src={coverImg} alt="coverImg"/>
          <div className={styles.back}>
            <ul className={styles.genre}>
              {genres.map(g => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}

Movie.propTypes = {
  id:PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  year: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;