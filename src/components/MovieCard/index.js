import React from "react";

const MovieCard= ({data}) => {
    return (
            <img src={data.posterImage}  width="60%"></img>
    )
}

export default MovieCard;