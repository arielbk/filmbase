import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import blankPoster from '../../assets/images/blank.png';
import { StyledMovie, Overlay, Poster } from './Movie.styled';

export const POSTER_PATH = 'https://image.tmdb.org/t/p/w185';

const Movie = props => {
	const { movie, children } = props;
	if (!movie) return null;
	return (
		<StyledMovie>
			<Link data-testid="movie-link" to={`/${movie.id}`}>
				<Poster
					data-testid="movie-poster"
					src={
						movie.poster_path !== null
							? `${POSTER_PATH}${movie.poster_path}`
							: blankPoster
					}
					alt={movie.title}
				/>
				<Overlay>{children}</Overlay>
			</Link>
		</StyledMovie>
	);
};

export default Movie;

Movie.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		poster_path: PropTypes.string,
		desc: PropTypes.string,
	}).isRequired,
	children: PropTypes.node.isRequired,
};
