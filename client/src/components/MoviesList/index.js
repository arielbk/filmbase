import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';

import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { MovieGrid, GenreTab, GenreList, LoadMore } from './MoviesList.styled';
import { $brandGreen } from '../../assets/vars.styled';
import Loading from '../Loading';
import SortOptions from '../SortOptions';
import Movie from '../Movie';
import genres from '../../assets/genres';

const MoviesList = ({ match, showHearted, ...props }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('popularity.desc');
	let voteCount = 100;
	// Require at least 500 votes for the 'top rated' category
	if (sortBy === 'vote_average.desc') voteCount = 500;

	const fetchFilms = async (key, options, page = 1) => {
		const apiURL = searchQuery
			? `https://api.themoviedb.org/3/search/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
			: `https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}`;
		const { data } = await axios.get(apiURL);
		return data;
	};

	const {
		status,
		data,
		error,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore,
	} = useInfiniteQuery(['films', { searchQuery, sortBy }], fetchFilms, {
		getFetchMore: lastGroup =>
			lastGroup.total_pages > lastGroup.page ? lastGroup.page + 1 : null,
	});

	const films = [];
	data.forEach(group => group.results.forEach(film => films.push(film)));

	const { user, isAuthenticated } = useSelector(state => state.auth);

	const loadMoreButtonRef = useRef();
	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchMore,
		rootMargin: '500px',
	});

	useEffect(() => {
		if (match.params.query) setSearchQuery(match.params.query);
	}, [match.params]);

	let topComponent;
	if (!showHearted) {
		!searchQuery
			? (topComponent = <SortOptions sortBy={sortBy} setSortBy={setSortBy} />)
			: (topComponent = (
					<>
						<h3>Search term:</h3>
						{searchQuery}
					</>
			  ));
	} else {
		topComponent = <h1>Hearted Films for {user.name}</h1>;
	}
	return (
		<>
			{showHearted && !isAuthenticated && <Redirect to="/login" />}

			{topComponent}

			<MovieGrid data-testid="movie-results">
				{films.map(movie => (
					<Movie key={movie.id} movie={movie}>
						<h3 data-testid="movieposter-title">{movie.title}</h3>
						<h5 data-testid="movieposter-year">
							{movie.release_date && movie.release_date.split('-')[0]}
						</h5>
						<ReactStars
							count={5}
							value={movie.vote_average / 2}
							size={24}
							color2={$brandGreen}
							edit={false}
						/>
						<GenreList>
							{movie.genre_ids &&
								movie.genre_ids.length &&
								movie.genre_ids.map(genreID => (
									<span key={genreID}>
										{genres.map(
											genre =>
												genreID === genre.id && (
													<GenreTab
														data-testid="movieposter-genre"
														key={genre.name}
													>
														{genre.name}
													</GenreTab>
												)
										)}
									</span>
								))}
						</GenreList>
					</Movie>
				))}
			</MovieGrid>
			{/* )} */}

			{!isFetching && !films.length && (
				<h2
					data-testid="movie-results"
					style={{ position: 'relative', top: '-4rem', fontWeight: 200 }}
				>
					No films found!
				</h2>
			)}

			{isFetchingMore && <Loading />}
			{canFetchMore && (
				<LoadMore type="button" ref={loadMoreButtonRef}>
					Load more
				</LoadMore>
			)}
		</>
	);
};

export default MoviesList;
