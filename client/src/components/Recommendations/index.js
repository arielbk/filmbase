import React, { Fragment } from 'react';
import Movie from '../Movie';
import { Title, RecMovieGrid } from './Recommendations.styled';

const Recommendations = props => {
	const { recommendations } = props;
	return (
		<Fragment>
			<Title>Recommendations</Title>
			<RecMovieGrid>
				<Movie movie={recommendations[0]}>Film</Movie>
				<Movie movie={recommendations[2]}>Film</Movie>
				<Movie movie={recommendations[3]}>Film</Movie>
				<Movie movie={recommendations[4]}>Film</Movie>
			</RecMovieGrid>
		</Fragment>
	);
};

export default Recommendations;
