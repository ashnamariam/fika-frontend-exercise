import React from "react";
import SearchComponent from "../SearchComponent";
import './style.css';
import Select from 'react-select';
import logo from '../../assets/images/logo.png'
const Header = ({ setSelectedGenre, movieGenres, setSearchTerm }) => {

  return (
    <div className="header">
      <img className="logo" src={logo}></img>
      <div className="rightContainer">
      <Select
        className="dropdown"
        placeholder='Select genre'
        onChange={setSelectedGenre}
        options={movieGenres}
      />
      <SearchComponent onChangeSearch={setSearchTerm}></SearchComponent>
   
      </div>
    </div>
  )
}

export default Header;