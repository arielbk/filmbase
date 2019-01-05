import React from 'react';

import { StyledLoader, Container, SquareOne, SquareTwo } from './Loading.styled';

const Loading = () => (
	<StyledLoader data-testid="loading">
		<Container>
			<SquareOne />
			<SquareTwo />
		</Container>
		<p>loading...</p>
	</StyledLoader>
);

export default Loading;
