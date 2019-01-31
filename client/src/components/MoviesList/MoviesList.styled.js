import styled from 'styled-components';

export const MovieGrid = styled.div`
	margin: 0 auto;
	display: grid;
	padding: 4rem 1rem;
	grid-template-columns: repeat(5, 1fr);
	grid-row-gap: 2rem;
	max-width: 1250px;

	@media (max-width: 1020px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 820px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 620px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 420px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const GenreTab = styled.div`
	display: inline-block;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 3px;
	color: #ddd;
	padding: 0.2rem 0.4rem;
	margin: 0.1rem;
	text-align: center;
`;

export const GenreList = styled.div`
	margin-top: 0.2rem;
`;
