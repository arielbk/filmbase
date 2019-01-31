import styled from 'styled-components';
import { MovieGrid } from '../MoviesList/MoviesList.styled';
import { $brandGreen } from '../../assets/vars.styled';

export const Title = styled.h2`
	margin: 2.5rem 0 2rem;
`;

export const RecMovieGrid = styled(MovieGrid)`
	padding: 0;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 1020px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 930px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 820px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 620px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 420px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const SeeMoreContainer = styled.div`
	width: 100%;
	padding: 2rem 0;
	text-align: center;
`;

export const SeeMoreButton = styled.div`
	color: ${$brandGreen};
	display: inline-block;
	margin: 0 auto;
	text-align: center;
	width: 20%;
	background: rgba(0, 0, 0, 0.4);
	padding: 1rem;
	border-radius: 3px;
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		color: #fff;
	}
`;
