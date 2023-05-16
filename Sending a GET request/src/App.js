import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchMovieHandler = useCallback(async ()=> { 
    setIsLoading(true);
    setError(null);
    try{
      const respone = await fetch('https://swapi.dev/api/films/')
      if (!respone.ok) {
        throw new Error ('Something went wrong!');
      }
      const data = await respone.json();

      const transformMovies = data.results.map( moiveData => {
         return {
          id: moiveData.episode_id,
          title: moiveData.title,
          openingText: moiveData.opening_crawl,
          releaseDate: moiveData.release_date
         };
      });
      setMovies(transformMovies);
      setIsLoading(false);
    } catch(error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [])
  useEffect( ()=> {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Data is fetching please wait...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler} >Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Data is fetching please wait...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
