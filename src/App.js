import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import React from 'react'
import MovieCard from'./MovieCard';


//17da2dde
const API_URL = 'https://omdbapi.com?apikey=17da2dde';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    useEffect(()=>{
        searchMovies('Spiderman');
    },[])
  return (
    <div className = "app">
      <h1>React Movie Searcher</h1>
      <div className="search">
        <input
          placeholder='Search for movies'
          value= {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <img 
            src={SearchIcon}
            alt='search'
            onClick={() =>searchMovies(searchTerm)}
          />
      </div>
      {movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie) =>(
              <MovieCard movie = {movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  )
};

export default App;