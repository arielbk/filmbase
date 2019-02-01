import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import commaNumber from 'comma-number';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import blankPhoto from '../../assets/images/blank.png';
import Recommendations from '../Recommendations';
import { $brandGreen } from '../../assets/vars.styled';
import Trailer from '../Trailer';
import { heartFilm, unheartFilm } from '../../actions/heartActions';
import Loading from '../Loading';
import { Poster } from '../Movie/Movie.styled.js';
import Cast from '../Cast';
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
	BackButton,
	RelatedFilms,
	HeartButton,
	UnheartButton,
} from './MovieDetail.styled';

export const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';
const POSTER_PATH_SMALL = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
	state = {
		id: '',
		movie: {},
		credits: {},
		videos: [],
		trailer: {},
		recommendations: [],
		showRecommendationsCount: 6,
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
		hearted: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
		heartFilm: PropTypes.func.isRequired,
		unheartFilm: PropTypes.func.isRequired,
	};

	static contextTypes = {
		router: () => null,
	};

	componentDidMount = () => {
		this.setState({ id: this.props.match.params.id });
		this.setFilm();
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.id !== prevState.id) return { id: nextProps.match.params.id };
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.setFilm();
		}
	}

	setFilm = async () => {
		const { id } = this.state;
		// load film details
		try {
			const movieRes = await fetch(
				`https://api.themoviedb.org/3/movie/${id}?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&append_to_response=credits,videos,recommendations`
			);
			const movie = await movieRes.json();

			const trailer = movie.videos.results.filter(
				video => video.site === 'YouTube' && video.type === 'Trailer'
			)[0];

			this.setState({
				movie,
				credits: movie.credits,
				videos: movie.videos.results,
				trailer,
				recommendations: movie.recommendations.results,
				showRecommendationsCount: 6,
				loading: false,
			});

			// Start at the top of the new page
			window.scrollTo(0, 0);
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	};

	onSeeMoreRecommendations = () => {
		const { recommendations } = this.state;
		this.setState(prevState => {
			if (prevState.showRecommendationsCount + 6 <= recommendations.length)
				return { showRecommendationsCount: prevState.showRecommendationsCount + 6 };
			return { showRecommendationsCount: recommendations.length };
		});
	};

	render() {
		const {
			movie,
			credits,
			loading,
			trailer,
			recommendations,
			showRecommendationsCount,
		} = this.state;
		const { history, hearted, auth } = this.props;

		let director;
		if (credits.crew) director = credits.crew.filter(member => member.job === 'Director')[0];

		// Marker for whether this film has already been hearted or not
		let filmHearted = false;
		hearted.hearted.forEach(film => {
			if (film.id === movie.id) filmHearted = true;
		});

		return (
			<MovieWrapper>
				{loading && <Loading />}
				{!loading && movie && !movie.status_code && (
					<Fragment>
						<Background
							backdrop={
								Object.keys(movie).length &&
								`${BACKDROP_PATH}${movie.backdrop_path}`
							}
						/>
						<MovieInfo>
							<SidePanel>
								<SideTitle>
									<h1 data-testid="movie-title" style={{ display: 'inline' }}>
										{movie.title}
									</h1>
									<h4 data-testid="movie-tagline">{movie.tagline}</h4>
								</SideTitle>
								<Poster
									data-testid="movie-poster"
									src={
										Object.keys(movie).length &&
										`${POSTER_PATH}${movie.poster_path}`
									}
									alt={movie.title}
								/>
								<Votes>
									<ReactStars
										count={5}
										value={movie.vote_average / 2}
										size={24}
										color2={$brandGreen}
										edit={false}
									/>
									<div>
										<span data-testid="vote-average">{movie.vote_average}</span>
										/10
										<span
											style={{
												marginLeft: '1rem',
												fontSize: '0.8rem',
												color: '#aaa',
											}}
										>
											(
											<span data-testid="vote-count">{movie.vote_count}</span>{' '}
											votes)
										</span>
									</div>
								</Votes>
								<div>
									{filmHearted === true ? (
										<UnheartButton
											onClick={() => {
												this.props.unheartFilm(movie.id);
											}}
										>
											Unheart
										</UnheartButton>
									) : (
										<HeartButton
											onClick={() => {
												auth.isAuthenticated
													? this.props.heartFilm(movie)
													: history.push('/login');
											}}
										>
											Heart
										</HeartButton>
									)}
								</div>
								<div>
									{movie.genres &&
										movie.genres.map(genre => (
											<GenreTab data-testid="movie-genre" key={genre.name}>
												{genre.name}
											</GenreTab>
										))}
								</div>

								<SideStat>
									<span>Released:</span>
									<h3 data-testid="movie-release-date">{movie.release_date}</h3>
								</SideStat>

								<SideStat>
									<span>Director</span>
									<h3>{director.name}</h3>
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
										<h3 data-testid="movie-budget">
											${commaNumber(movie.budget)}
										</h3>
									</SideStat>
								)}

								{movie.revenue !== 0 && (
									<SideStat>
										<span>Revenue:</span>
										<h3 data-testid="movie-revenue">
											${commaNumber(movie.revenue)}
										</h3>
									</SideStat>
								)}

								{movie.belongs_to_collection && (
									<RelatedFilms>
										<h4>Part of</h4>
										<h3>{movie.belongs_to_collection.name}</h3>
										<img
											src={
												movie.belongs_to_collection.poster_path
													? `${POSTER_PATH_SMALL}${
															movie.belongs_to_collection.poster_path
													  }`
													: blankPhoto
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

								<Overview data-testid="movie-overview">{movie.overview}</Overview>

								<Cast credits={credits} />

								{trailer && <Trailer id={trailer.key} />}

								{recommendations.length && (
									<Recommendations
										recommendations={recommendations}
										count={showRecommendationsCount}
										setFilm={this.setFilm}
										onSeeMore={this.onSeeMoreRecommendations}
									/>
								)}

								<BackButton onClick={history.goBack}>
									<svg
										width="27"
										height="152"
										viewBox="0 0 27 152"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M24 1L3.22649 75.1911C3.07834 75.7202 3.07835 76.2798 3.22649 76.8089L24 151" />
									</svg>
								</BackButton>
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
	hearted: state.hearted,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ heartFilm, unheartFilm }
)(withRouter(MovieDetail));
