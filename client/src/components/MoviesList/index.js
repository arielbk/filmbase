import React, { PureComponent, Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFilmList, setListPage, setSearchQuery, setSortBy } from '../../actions/listActions';

import { MovieGrid, SortOptions, Genre } from './MoviesList.styled';

import { $brandGreen } from '../../assets/vars.styled';
import Loading from '../Loading';
// import PageControls from '../PageControls';
import Movie from '../Movie';
const apiKey = process.env.REACT_APP_TMDB_KEY;

class MoviesList extends PureComponent {
	state = {
		// populated by API request, genre codes corresponding to a genre name
		genres: [],
	};

	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				page: PropTypes.string,
				searchQuery: PropTypes.string,
			}),
		}),
		list: PropTypes.shape({
			films: PropTypes.array.isRequired,
			loading: PropTypes.bool.isRequired,
			page: PropTypes.number,
			searchQuery: PropTypes.string,
			sortBy: PropTypes.string,
		}).isRequired,
	};
	static defaultProps = {
		match: {
			params: {
				page: '1',
				searchQuery: null,
			},
		},
		list: {
			page: 1,
			searchQuery: null,
			sortBy: 'popular.desc',
		},
	};

	async componentDidMount() {
		try {
			const genresRes = await fetch(
				`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
			);
			const genres = await genresRes.json();
			this.setState({ genres });
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}

		const { match } = this.props;
		const { page, query } = match.params;
		this.props.setListPage(page);
		this.props.setSearchQuery(query);
		this.props.updateFilmList(page, null, query);
	}

	render() {
		const { films, page, searchQuery, loading, sortBy } = this.props.list;
		const { genres } = this.state;
		console.log(genres);
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
						{films.map(movie => (
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
								{/* <div style={{ marginTop: '1rem' }}>
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
								</div> */}
							</Movie>
						))}
					</MovieGrid>
				)}

				{!loading && !films.length && (
					<h2 data-testid="movie-results" style={{ position: 'relative', top: '-4rem' }}>
						No films found!
					</h2>
				)}
				{/* <PageControls page={page} search={searchQuery} /> */}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	list: state.list,
});

export default connect(
	mapStateToProps,
	{ updateFilmList, setListPage, setSearchQuery, setSortBy }
)(MoviesList);
