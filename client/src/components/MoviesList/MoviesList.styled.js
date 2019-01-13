import styled from 'styled-components';
import { $lightGrey } from '../../assets/vars.styled';

export const MovieGrid = styled.div`
	margin: 0 auto;
	display: grid;
	padding: 4rem 1rem;
	grid-template-columns: repeat(5, 1fr);
	grid-row-gap: 1rem;
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

export const Genre = styled.div`
	display: inline-block;
	padding: 0.4rem;
	margin-right: 0.5rem;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.8);
	color: #ccc;
	&::after {
		content: ' / ';
	}
	&:last-child {
		:after {
			content: '';
		}
	}
`;
