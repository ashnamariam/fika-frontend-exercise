export const getFormattedMovieData = (data,movieGenres) => {
    if (data && data.length > 0 && movieGenres)
      return data.map(
        ({
          id,
          title,
          overview,
          poster_path,
          vote_average,
          vote_count,
          genre_ids,
          release_date,
        }) => {
          let refactoredGenres = [];
          genre_ids.map(genre => movieGenres && movieGenres.filter(({ id, value }) => (id === genre) && refactoredGenres.push(value)));
          return {
            id: String(id),
            title,
            overview,
            posterImage: `https://image.tmdb.org/t/p/w500/${poster_path}`,
            voteAverage: vote_average,
            voteCount: vote_count,
            genres: refactoredGenres,
            releaseDate: release_date,
          };
        },
      );
  }