import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFilmList, setListPage, setSearchQuery, setSortBy } from '../../actions/listActions';

import { MovieGrid, Genre } from './MoviesList.styled';

import { $brandGreen } from '../../assets/vars.styled';
import Loading from '../Loading';
import SortOptions from '../SortOptions';
import PageControls from '../PageControls';
import Movie from '../Movie';

class MoviesList extends Component {
	state = {
		// populated by API request, genre codes corresponding to a genre name
		// this is a waste of an api request though really... and holds up the whole app
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
		showStarred: PropTypes.bool,
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
		starred: PropTypes.object.isRequired,
		showStarred: false,
	};

	async componentDidMount() {
		try {
			const genresRes = await fetch(
				`https://api.themoviedb.org/3/genre/movie/list?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US`
			);
			const genres = await genresRes.json();
			this.setState({ genres });
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}

		const { match } = this.props;
		const { page, query } = match.params;
		this.props.setListPage(page || 1);
		this.props.setSearchQuery(query);
		this.props.updateFilmList(page, query);
	}

	render() {
		const { showStarred } = this.props;
		const { searchQuery, loading, sortBy } = this.props.list;
		let films;
		if (showStarred) {
			const { starred } = this.props.starred;
			films = starred;
		} else {
			films = this.props.list.films;
		}
		// const { genres } = this.state;
		return (
			<Fragment>
				{!searchQuery ? (
					<SortOptions />
				) : (
					<Fragment>
						<h3>Search term:</h3>
						{searchQuery}
					</Fragment>
				)}

				<PageControls />

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
				<PageControls />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	list: state.list,
	starred: state.starred,
});

export default connect(
	mapStateToProps,
	{ updateFilmList, setListPage, setSearchQuery, setSortBy }
)(MoviesList);
