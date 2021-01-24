import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import moviesAPI from '../Services/movie-api';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { MovieList } from '../components/MovieList/MovieList';
import { Loader } from '../components/Loader/Loader';
import ErrorView from './ErrorView';

export default function SearchMoviesView() {
    const history = useHistory();
    const location = useLocation();

    const searchQuery = new URLSearchParams(location.search).get('query') ?? '';

    const { isLoading, isError, isSuccess, data, error } = useQuery(
        ['searchMovies', searchQuery],
        async () => {
            const data = await moviesAPI.getSearchData(searchQuery);
            if (data.results.length === 0) {
                throw new Error(`No results for ${searchQuery}. Try another query.`);
            }

            return data;
        },
        {
            enabled: searchQuery !== '',
            retry: false,
        },
    );

    const onSearchQueryChange = query => {
        history.push({ ...location, search: `query=${query}` });
    };

    console.log(data);

    return (
        <>
            <SearchForm getSearchQuery={onSearchQueryChange} />
            {isLoading && <Loader />}
            {isSuccess && data && (
                <MovieList
                    movies={data.results}
                    title={`Search results for ${searchQuery}`}
                />
            )}
            {isError && <ErrorView title={error.message} />}
        </>
    );
}