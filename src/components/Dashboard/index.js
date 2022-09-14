import React, { useEffect, useState, useRef } from "react";
import { GetMovies, GetMoviesGenres, movieSearch } from "../../middleware";
import MovieCard from "../MovieCard";
import SearchComponent from "../SearchComponent";
import './style.css';
import Select from 'react-select';
import { getFormattedMovieData } from "../../utils";

const Dashboard = () => {
  const [movies, setMovies] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [searchTerm, setSearchTerm] = useState('')
  const [mappedMovieData, setMappedMovieData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState();
  const refContainer = useRef();

  useEffect(async () => {
    const movies = await GetMovies();
    let movieGenres = await GetMoviesGenres();
    movieGenres = movieGenres.genres.map(({ id, name }) => ({ id, value: name, label: name }));
    setMovieGenres(movieGenres);
    setMovies(movies.results);
  }, [])

  useEffect(() => {
    const getInitialMovieData = async () => {
      let finalObject = getFormattedMovieData(movies,movieGenres);
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
    setMappedMovieData(getFormattedMovieData(searchLists.results,movieGenres));
  };

  const handleScroll = async () => {
    if (refContainer.current) {
      const { scrollTop, scrollHeight, clientHeight, outerHeigth } = refContainer.current;
      if (scrollTop + clientHeight === scrollHeight) {
        let movieObject = await GetMovies(pageNumber + 1);
        movieObject = movieObject.results;
        setPageNumber(pageNumber + 1);
        const finalMovies = [...movies, ...movieObject];
        setMovies(finalMovies);
      }
    }
  };

  return (
    <div
      className="container"
      onScroll={handleScroll}
      ref={refContainer}
      style={{ height: "500px" }}
    >
      <div className="header">
        <Select
          className="dropdown"
          placeholder='Select genre'
          defaultValue={selectedGenre}
          onChange={setSelectedGenre}
          options={movieGenres}
        />
        <SearchComponent onChangeSearch={setSearchTerm}></SearchComponent>
      </div>
      <div className="movieContainer">
        {mappedMovieData && mappedMovieData.map(item => {
          return (
            <MovieCard data={item}></MovieCard>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard;