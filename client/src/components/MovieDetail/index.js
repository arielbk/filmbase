import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import commaNumber from 'comma-number';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFavouriteFilm } from '../../actions/listActions';
import Loading from '../Loading';
import { Poster } from '../Movie/Movie.styled.js';
import {
	MovieWrapper,
	Background,
	MovieInfo,
	MainContent,
	SidePanel,
	GenreTab,
	Votes,
	SideStat,
	Overview,
	MainTitle,
	SideTitle,
	Cast,
	BackButton,
	RelatedFilms,
	FavButton,
} from './MovieDetail.styled';

export const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';
const POSTER_PATH_SMALL = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';
export const CAST_PATH = 'https://image.tmdb.org/t/p/w185';

class MovieDetail extends Component {
	state = {
		movie: {},
		credits: {},
		loading: true,
	};

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string,
			}),
		}).isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		addFavouriteFilm: PropTypes.func.isRequired,
	};

	static contextTypes = {
		router: () => null,
	};

	async componentDidMount() {
		const { match } = this.props;
		const { params } = match;
		const { id } = params;

		// film details
		try {
			const movieRes = await fetch(
				`https://api.themoviedb.org/3/movie/${id}?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US`
			);
			const movie = await movieRes.json();

			const creditsRes = await fetch(
				`https://api.themoviedb.org/3/movie/${id}/credits?api_key=5f65a05aa95f0f49a243118f362a4d69`
			);
			const credits = await creditsRes.json();

			this.setState({
				movie,
				credits,
				loading: false,
			});
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	}

	render() {
		const { movie, credits, loading } = this.state;
		const { history } = this.props;
		return (
			<MovieWrapper>
				{loading && <Loading />}
				{!loading && movie && !movie.status_code && (
					<Fragment>
						<Background
							backdrop={Object.keys(movie).length && `${BACKDROP_PATH}${movie.backdrop_path}`}
						/>
						<MovieInfo>
							<SidePanel>
								<SideTitle>
									<h1 data-testid="movie-title" style={{ display: 'inline' }}>
										{movie.title}
									</h1>
									<h4 data-testid="movie-tagline">{movie.tagline}</h4>
								</SideTitle>
								<Overdrive id={String(movie.id)}>
									<Poster
										data-testid="movie-poster"
										src={Object.keys(movie).length && `${POSTER_PATH}${movie.poster_path}`}
										alt={movie.title}
									/>
								</Overdrive>
								<Votes>
									<ReactStars
										count={5}
										value={movie.vote_average / 2}
										size={24}
										color2="#4e9a46"
										edit={false}
									/>
									<div>
										<span data-testid="vote-average">{movie.vote_average}</span>
										/10
										<span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: '#aaa' }}>
											(<span data-testid="vote-count">{movie.vote_count}</span> votes)
										</span>
									</div>
								</Votes>
								<div>
									{movie.genres &&
										movie.genres.map(genre => (
											<GenreTab data-testid="movie-genre" key={genre.name}>
												{genre.name}
											</GenreTab>
										))}
								</div>
								<div>
									<FavButton
										onClick={() => {
											this.props.addFavouriteFilm(movie.id);
										}}
									>
										Add to Favourites
									</FavButton>
								</div>
								<SideStat>
									<span>Released:</span>
									<h3 data-testid="movie-release-date">{movie.release_date}</h3>
								</SideStat>

								<SideStat>
									<span>Runtime:</span>
									<h3 data-testid="movie-runtime">
										{movie.runtime}
										min
									</h3>
								</SideStat>

								{movie.budget !== 0 && (
									<SideStat>
										<span>Budget:</span>
										<h3 data-testid="movie-budget">${commaNumber(movie.budget)}</h3>
									</SideStat>
								)}

								{movie.revenue !== 0 && (
									<SideStat>
										<span>Revenue:</span>
										<h3 data-testid="movie-revenue">${commaNumber(movie.revenue)}</h3>
									</SideStat>
								)}

								{movie.belongs_to_collection && (
									<RelatedFilms>
										<h4>part of</h4>
										<h3>{movie.belongs_to_collection.name}</h3>
										<img
											src={
												Object.keys(movie).length &&
												`${POSTER_PATH_SMALL}${movie.belongs_to_collection.poster_path}`
											}
											alt={movie.belongs_to_collection.name}
										/>
									</RelatedFilms>
								)}
							</SidePanel>
							<MainContent>
								<MainTitle>
									<h1 data-testid="movie-title" style={{ display: 'inline' }}>
										{movie.title}
									</h1>
									<h4 data-testid="movie-tagline">{movie.tagline}</h4>
								</MainTitle>

								{/* CAST */}
								<Cast>
									{credits.cast &&
										credits.cast.map(credit => (
											<div data-testid="movie-credit" key={credit.credit_id}>
												<h3 data-testid="credit-name">{credit.name}</h3>
												<img
													data-testid="credit-photo"
													src={Object.keys(credit).length && `${CAST_PATH}${credit.profile_path}`}
													alt={credit.name}
												/>
												<h4 data-testid="credit-character">{credit.character}</h4>
											</div>
										))}
								</Cast>

								<Overview data-testid="movie-overview">{movie.overview}</Overview>

								<h3>Images</h3>
								<h3>Videos</h3>
								<h3>Recommendations</h3>

								<BackButton onClick={history.goBack}>&lt;</BackButton>
							</MainContent>
						</MovieInfo>
					</Fragment>
				)}
				{!loading && movie && movie.status_code === 34 && (
					<Fragment>
						<h2 data-testid="movie-title" style={{ marginTop: '6rem' }}>
							Film not found!
						</h2>
						<BackButton onClick={history.goBack}>&lt;</BackButton>
					</Fragment>
				)}
			</MovieWrapper>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ addFavouriteFilm }
)(withRouter(MovieDetail));
