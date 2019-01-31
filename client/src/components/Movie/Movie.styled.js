import styled from 'styled-components';

export const Poster = styled.img`
	box-shadow: 0 0 35px black;
	transition: transform 0.3s;
	border-radius: 3px;
`;

export const StyledMovie = styled.div`
	width: 185px;
	height: 278px;
	position: relative;
	margin: 0 auto;
	transition: 0.3s;
	a {
		text-decoration: none;
		color: #fff;
	}
	h3 {
		margin: 0;
		text-align: center;
	}
	h5 {
		margin: 0.5rem 0 0.7rem;
		font-weight: 400;
	}

	:hover {
		transform: scale(1.05);
	}
`;

export const Overlay = styled.div`
	background: rgba(0, 0, 0, 0.8);
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 3px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s;

	:hover {
		opacity: 1;
	}
`;
