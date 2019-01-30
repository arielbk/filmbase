import styled from 'styled-components';

export const TrailerContainer = styled.div`
	height: 500px;
`;

export const Title = styled.h2`
	margin: 2rem 0;
`;

export const YoutubeFrame = styled.iframe`
	width: 100%;
	// TODO: Make this actually keep an aspect ratio when resizing: https://css-tricks.com/aspect-ratio-boxes/
	min-height: 420px;
`;
