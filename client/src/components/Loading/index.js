import React from 'react';

import { StyledLoader, Container, CircleOne, CircleTwo } from './Loading.styled';

const Loading = () => (
	<StyledLoader data-testid="loading">
		<Container>
			<CircleOne />
			<CircleTwo />
		</Container>
		<p>loading...</p>
	</StyledLoader>
);

export default Loading;
