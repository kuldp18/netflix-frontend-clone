import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [showMovieDescription, setShowMovieDescription] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const fetchedMovies = request.data.results;
      const randomIndex = Math.floor(Math.random() * fetchedMovies.length - 1);
      setMovie(fetchedMovies[randomIndex]);
      return request;
    }
    fetchData();
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // close trailer window if it is already playing
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const trailerUrl = new URL(url);
          const v = trailerUrl.searchParams.get('v');
          setTrailerUrl(v);
        })
        .catch((err) => console.log(err));
    }
  };

  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + '…' : str;
  }

  return (
    <>
      <header
        className="banner"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundPosition: 'center center',
          backgroundBlendMode: 'darken',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className="banner__button">My List</button>
          </div>

          <h1
            className="banner__description"
            onClick={() => setShowMovieDescription(!showMovieDescription)}
          >
            {showMovieDescription
              ? movie?.overview
              : truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner--fadeBottom"></div>
      </header>
      {trailerUrl && (
        <YouTube videoId={trailerUrl} opts={opts} className="banner__trailer" />
      )}
    </>
  );
};

export default Banner;
