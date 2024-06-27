import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import React from 'react'
import MovieCard from'./MovieCard';
import OrderMoviesBy from './OrderMoviesBy';

//17da2dde
const API_URL = 'https://omdbapi.com?apikey=17da2dde';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({
    Year: '',
    Title: ''
  });

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search)
    }

    useEffect(()=>{
        searchMovies('marvel');
    },[])

    const sortMoviesBy = (type) => {
      const sortedMovies = [...movies].sort((a,b)=>{
          return sortOrder[type] === 'asc'
        ? (type === 'Year' ? (a.Year - b.Year) : (a.Title.localeCompare(b.Title)))
        : (type === 'Year' ? (b.Year - a.Year) : (b.Title.localeCompare(a.Title)));
        }
      )
      setMovies(sortedMovies);
      setSortOrder((prevSortOrder)=>({
        ...prevSortOrder,
        [type]: prevSortOrder[type] === 'asc'? 'desc' : 'asc',
        [type === 'Year' ? 'Title' : 'Year']: ''
      }));
    }

  return (
    <div className = "app">
      <h1>React Movie Searcher</h1>
      <div className="search ">
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
      <div className="orderByBox">
        <OrderMoviesBy type ="Year" sortMoviesBy = {sortMoviesBy} sortOrder={sortOrder.Year}/>
        <OrderMoviesBy type ="Title" sortMoviesBy = {sortMoviesBy} sortOrder={sortOrder.Title}/>
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