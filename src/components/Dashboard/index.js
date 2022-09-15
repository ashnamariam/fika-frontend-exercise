import React, { useEffect, useState, useRef } from "react";
import { GetMovies, GetMoviesGenres, movieSearch } from "../../middleware";
import MovieCard from "../MovieCard";
import './style.css';
import { getFormattedMovieData } from "../../utils";
import Header from "../Header";
import Pagination from "../Pagination";

const Dashboard = () => {
  const [movies, setMovies] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [searchTerm, setSearchTerm] = useState('')
  const [mappedMovieData, setMappedMovieData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState();

  useEffect(async () => {
    const movies = await GetMovies();
    let movieGenres = await GetMoviesGenres();
    movieGenres = movieGenres.genres.map(({ id, name }) => ({ id, value: name, label: name }));
    setMovieGenres(movieGenres);
    setMovies(movies.results);
  }, [])

  useEffect(() => {
    const getInitialMovieData = async () => {
      let finalObject = getFormattedMovieData(movies, movieGenres);
      setMappedMovieData(finalObject);
    };
    getInitialMovieData();
  }, [movies, movieGenres])

  useEffect(() => {
    if (searchTerm) searchData();
  }, [searchTerm]);

  useEffect(() => {
    if (mappedMovieData && mappedMovieData.length > 0 && selectedGenre) {
      let movieData = [];
      mappedMovieData.map(movie => {
        movie.genres.filter(item => {
          if (item === selectedGenre.value) {
            movieData.push(movie);
          }
        })
      })
      setMappedMovieData(movieData)
    }
  }, [selectedGenre]);

  const searchData = async () => {
    const searchLists = await movieSearch(searchTerm);
    setMappedMovieData(getFormattedMovieData(searchLists.results, movieGenres));
  };

  const getMovies = async () => {
    let movieObject = await GetMovies(pageNumber);
    movieObject = movieObject.results;
    setMovies(movieObject);
  }

  useEffect(() => {
    if (pageNumber) {
      getMovies()
    }
  }, [pageNumber])

  return (
    <div>
      <div
        className="container">
        <Header movieGenres={movieGenres}
          setSelectedGenre={setSelectedGenre}
          setSearchTerm={setSearchTerm}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        ></Header>
        <div className="movieContainer">
          {mappedMovieData && mappedMovieData.map(item => {
            return (
              <MovieCard data={item}></MovieCard>
            )
          })}
        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}></Pagination>
    </div>
  )
}

export default Dashboard;