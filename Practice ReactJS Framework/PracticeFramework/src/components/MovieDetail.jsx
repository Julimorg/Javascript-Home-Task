import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

const MovieDetail = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    console.log(id);
    const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
    const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

    useEffect(() => {
        const fetchMovieDetails = async() =>{
            try{
                const response = await fetch(MOVIE_DETAIL_API);
                const data = await response.json();
                setMovie(data);
            }catch (error){
                console.log("Error fetching",error);
            }
        };
        fetchMovieDetails();
    },[id]);

    if (!movie) return <p className="text-center mt-5">Loading movie details...</p>;
    
    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <div className="row">

                    <div className="col-md-4">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt= {movie.title} className="img-fluid rounded"/>
                    </div>

                    <div className="col-md-8">
                        <h1 className="mb-3">
                            {movie.title}
                        </h1>
                        <p className = "text-muted"><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Overview: </strong>{movie.overview}</p>
                        <p><strong>Rating: </strong>{movie.vote_average} / 10</p>
                    </div>

                    <div className="mb-3">
                        <strong>Genres: </strong> {" "}
                        {movie.genres && movie.genres.map((genre) => {
                            <span key = {genre.id} className = "badge bg-primary me-2">{genre.name}</span>
                        })}
                    </div>
                    
                    {movie.homepage && (
                        <a href="{movie.homepage}" target= "_blank" rel = "noopener noreferrer" className="btn btn-danger mt-2">
                            Visit Official Site
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
export default MovieDetail;