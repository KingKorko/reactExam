import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const addTopRatedPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['top_rated'],
    queryFn: getTopRatedMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  
  return (
    <PageTemplate
      title="Top Rated"
      movies={movies}
      action={(movie) => {
      }}
    />
  );

};

export default addTopRatedPage;
