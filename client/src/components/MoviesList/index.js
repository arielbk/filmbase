import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateFilmList, setListPage, setSearchQuery, setSortBy } from '../../actions/listActions';

import { MovieGrid, GenreTab, GenreList } from './MoviesList.styled';

import { $brandGreen } from '../../assets/vars.styled';
import Loading from '../Loading';
import SortOptions from '../SortOptions';
import PageControls from '../PageControls';
import Movie from '../Movie';
import genres from '../../assets/genres';

class MoviesList extends Component {
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
		showHearted: PropTypes.bool,
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
		hearted: PropTypes.object.isRequired,
		showHearted: false,
	};

	async componentDidMount() {
		const { match } = this.props;
		const { page, query } = match.params;
		this.props.setListPage(page || 1);
		this.props.setSearchQuery(query);
		this.props.updateFilmList(page, query);
	}

	render() {
		const { showHearted } = this.props;
		const { searchQuery, loading, sortBy } = this.props.list;
		let films;
		if (showHearted) {
			const { hearted } = this.props.hearted;
			films = hearted;
		} else {
			films = this.props.list.films;
		}
		return (
			<Fragment>
				{!searchQuery ? (
					<SortOptions sortBy={sortBy} />
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
								<h5 data-testid="movieposter-year">
									{movie.release_date.split('-')[0]}
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
	hearted: state.hearted,
});

export default connect(
	mapStateToProps,
	{ updateFilmList, setListPage, setSearchQuery, setSortBy }
)(MoviesList);
