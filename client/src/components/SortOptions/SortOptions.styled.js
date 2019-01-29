import styled from 'styled-components';
import { $lightGrey, $brandGreen } from '../../assets/vars.styled';

export const StyledSortOptions = styled.div`
	h4 {
		margin: 0;
		margin-bottom: 1rem;
	}
	border-radius: 3px;
	width: 50%;
	margin-top: 2rem;
	background: #111;
	display: inline-block;
	padding: 1rem;
`;

export const SortButton = styled.button`
	font-size: 1rem;
	background: transparent;
	border: none;
	margin: 0.5rem;
	color: ${$lightGrey};
	:hover {
		cursor: pointer;
	}
	${({ active }) => active && `color: ${$brandGreen}`};
`;
