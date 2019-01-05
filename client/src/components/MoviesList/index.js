import React, { PureComponent, Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';

import { MovieGrid, SortOptions, Genre } from './MoviesList.styled';

import { $brandGreen } from '../../assets/vars.styled';
import Loading from '../Loading';
import PageControls from '../PageControls';
import Movie from '../Movie';

export default class MoviesList extends PureComponent {
	state = {
		// list of movies to show
		movies: [],
		// populated by API request, genre codes corresponding to a genre name
		genres: [],
		// how the list of movies should be sorted
		sortBy: 'popularity.desc',
		loading: true,
		searchQuery: null,
	};

	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				page: PropTypes.string,
				searchQuery: PropTypes.string,
			}),
		}),
	};

	static defaultProps = {
		match: {
			params: {
				page: '1',
				searchQuery: null,
			},
		},
	};

	async componentDidMount() {
		const { match } = this.props;
		const searchQuery = match.params.query;
		await this.setState({ searchQuery });
		this.fetchMovies();
		try {
			const genresRes = await fetch(
				'https://api.themoviedb.org/3/genre/movie/list?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US'
			);
			const genreObj = await genresRes.json();
			this.setState({
				genres: genreObj.genres,
			});
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	}

	fetchMovies = async () => {
		try {
			await this.setState({ loading: true });

			const { sortBy, searchQuery } = this.state;
			const { match } = this.props;
			const { page } = match.params;

			let res;
			if (!searchQuery) {
				res = await fetch(
					`https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`
				);
			} else {
				res = await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
				);
			}
			const movies = await res.json();
			this.setState({
				movies: movies.results,
				loading: false,
			});
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	};

	render() {
		const { movies, genres, sortBy, loading, searchQuery } = this.state;
		const { match } = this.props;
		let page = parseInt(match.params.page, 10);
		if (Number.isNaN(page)) page = 1;
		return (
			<Fragment>
				{!searchQuery ? (
					<SortOptions>
						<h4>Sort by:</h4>
						<button
							style={sortBy === 'popularity.desc' ? { color: '#5eb94e' } : {}}
							onClick={() => this.setState({ sortBy: 'popularity.desc' }, this.fetchMovies)}
							type="button"
						>
							most popular
						</button>
						<button
							style={sortBy === 'release_date.desc' ? { color: '#5eb94e' } : {}}
							onClick={() => this.setState({ sortBy: 'release_date.desc' }, this.fetchMovies)}
							type="button"
						>
							newest
						</button>
						<button
							style={sortBy === 'vote_average.desc' ? { color: '#5eb94e' } : {}}
							onClick={() => this.setState({ sortBy: 'vote_average.desc' }, this.fetchMovies)}
							type="button"
						>
							best rated
						</button>
					</SortOptions>
				) : (
					<Fragment>
						<h3>Search term:</h3>
						{searchQuery}
					</Fragment>
				)}

				{loading ? (
					<Loading />
				) : (
					<MovieGrid data-testid="movie-results">
						{movies.map(movie => (
							<Movie key={movie.id} movie={movie}>
								<h3 data-testid="movieposter-title">{movie.title}</h3>
								<h5 data-testid="movieposter-year">{movie.release_date.split('-')[0]}</h5>
								<ReactStars
									count={5}
									value={movie.vote_average / 2}
									size={24}
									color2={$brandGreen}
									edit={false}
								/>
								<div style={{ marginTop: '1rem' }}>
									{movie.genre_ids.length &&
										movie.genre_ids.map(genreID => (
											<span key={genreID}>
												{genres.map(
													genre =>
														genreID === genre.id && (
															<Genre data-testid="movieposter-genre" key={genre.name}>
																{genre.name}
															</Genre>
														)
												)}
											</span>
										))}
								</div>
							</Movie>
						))}
					</MovieGrid>
				)}

				{!loading && !movies.length && (
					<h2 data-testid="movie-results" style={{ position: 'relative', top: '-4rem' }}>
						No films found!
					</h2>
				)}
				<PageControls page={page} search={searchQuery} />
			</Fragment>
		);
	}
}
