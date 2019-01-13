import styled from 'styled-components';
import { $lightGrey } from '../../assets/vars.styled';

export const StyledSortOptions = styled.div`
	h4 {
		margin: 0;
		margin-bottom: 1rem;
	}
	margin-top: 2rem;
	background: #111;
	border-radius: 12px;
	display: inline-block;
	padding: 1rem;
	button {
		font-size: 1rem;
		background: transparent;
		border: none;
		margin: 0.5rem;
		color: ${$lightGrey};
		:hover {
			cursor: pointer;
		}
	}
`;
