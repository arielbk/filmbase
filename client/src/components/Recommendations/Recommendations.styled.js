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
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SeeMoreButton = styled.div`
  font-size: 0.9rem;
  padding: 1rem;
  width: 150px;
  height: 80px;
  border-radius: 22px;
  background: rgba(0,0,0,0.8);
  transition: 0.3s;
  color ${$brandGreen};
  cursor: pointer;
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #fff;
  }
`;
