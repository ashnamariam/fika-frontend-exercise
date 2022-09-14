import React from "react";
import './style.css';

const SearchComponent = ({ onChangeSearch }) => {
  return (
    <div className="searchContainer">
      <input
        className="inputContainer"
        type='text'
        placeholder='search'
        onChange={(e) => {
          onChangeSearch(e.target.value);
        }}
      />
    </div>
  )
}

export default SearchComponent;