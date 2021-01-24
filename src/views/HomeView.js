import React from 'react';
import { useQuery } from 'react-query';
import moviesAPI from '../Services/movie-api';
import { MovieList } from '../components/MovieList/MovieList';
import ErrorView from './ErrorView';
import { Loader } from '../components/Loader/Loader'
// import Loader from 'react-spinners/HashLoader';

export default function HomeView() {
    const { isLoading, isError, isSuccess, data, error } = useQuery(
        'trendingMovies',
        moviesAPI.getTrendingData,
    );

    console.log(data);

    return (
        <>
            {isLoading && <Loader />}
            {isSuccess && <MovieList movies={data.results} title="Trending today" />}
            {isError && <ErrorView title={error.message} />}
        </>
    );
}