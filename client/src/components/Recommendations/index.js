import React, { Component, Fragment } from 'react';
import ReactStars from 'react-stars';
import Movie from '../Movie';
import { Title, RecMovieGrid, SeeMoreContainer, SeeMoreButton } from './Recommendations.styled';
import { GenreTab, GenreList } from '../MoviesList/MoviesList.styled';
import { $brandGreen } from '../../assets/vars.styled';
import genres from '../../assets/genres';

export default class Recommendations extends Component {
	render() {
		const { recommendations, count, onSeeMore } = this.props;
		const coupleRecs = recommendations.slice(0, count);
		let seeMoreButton = true;
		if (count === recommendations.length) seeMoreButton = false;

		return (
			<Fragment>
				<Title>Recommendations</Title>
				<RecMovieGrid>
					{coupleRecs.map(movie => (
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
				</RecMovieGrid>
				{seeMoreButton && (
					<SeeMoreContainer>
						<SeeMoreButton onClick={onSeeMore}>See More</SeeMoreButton>
					</SeeMoreContainer>
				)}
			</Fragment>
		);
	}
}
