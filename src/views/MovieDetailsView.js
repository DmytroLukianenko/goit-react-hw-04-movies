import React, { lazy, Suspense } from 'react';
import { Redirect, Route, useParams, useRouteMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import moviesAPI from '../Services/movie-api';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { Loader } from '../components/Loader/Loader'
import ErrorView from './ErrorView';
import { Button } from '../components/Button/Button';
import { func } from 'prop-types';
// import { MovieCast } from '../components/MovieCast/MovieCast'


const MovieCast = lazy(() =>
    import('../components/MovieCast/MovieCast' /* webpackChunkName: "movie-cast" */),
);
const MovieReviews = lazy(() =>
    import('../components/MovieReviews/MovieReviews' /* webpackChunkName: "movie-reviews" */),
);

export default function MovieDetailsView() {
    const { slug } = useParams();
    const { url, path } = useRouteMatch();

    const location = useLocation();

    const movieId = slug.match(/[0-9]+$/)[0];

    const isValidRoute =
        location.pathname === url ||
        location.pathname === `${url}/reviews` ||
        location.pathname === `${url}/cast`;

    const { isLoading, isError, isSuccess, data, error } = useQuery(
        ['searchMovies', movieId],
        async () => {
            const data = await moviesAPI.getMovieById(movieId);
            if (data.status_code === 34) {
                throw new Error('No details for this movie');
            }
            console.log(data);
            return data;
        },
        {
            retry: false,
        },
    );

    return (
        <>
            {!isValidRoute && <Redirect to="/" />}

            <div style={{ width: '100%' }}>
                <Button route={location.state} />
            </div>

            {isLoading && <Loader />}
            {isSuccess && <MovieCard movie={data} />}
            {isError && <ErrorView title={error.message} />}

            <Suspense fallback={<Loader />}>
                <Route path={`${path}/cast`}>
                    {data && <MovieCast id={data.id} />}
                </Route>

                <Route path={`${path}/reviews`}>
                    {data && <MovieReviews id={data.id} />}
                </Route>
            </Suspense>
        </>
    );
}