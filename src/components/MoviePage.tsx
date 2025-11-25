import { useEffect, useState } from "react";
import { popular } from "../modules/ApiLinks";
import "./MoviePage.css";

interface movieInfo {
  id: number;
  overview: string;
  title: string;
  poster_path: string;
  original_language: string;
  vote_average: number;
  release_date: string;
}

interface ApiResponse {
  results: movieInfo[];
}

const MoviePage = () => {
  const [showItems, setShowItems] = useState<movieInfo[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(popular);
        const data: ApiResponse = await response.json();

        setShowItems(data.results); // FIXED
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movieContainer">
      {showItems.map((item) => (
        <div className="movieCard" key={item.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title}
            className="moviePoster"
          />
          <div className="movieInfo">
            <h2>{item.title}</h2>
            <p className="rating">{item.vote_average.toFixed(1)}</p>
          </div>
          <div className="movieInfoBottom">
            <p>{item.release_date}</p>
            <p>{item.original_language}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviePage;
