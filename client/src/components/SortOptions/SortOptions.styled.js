import styled from 'styled-components';
import { $lightGrey, $brandGreen } from '../../assets/vars.styled';

export const StyledSortOptions = styled.div`
	h4 {
		margin: 0;
		margin-bottom: 1rem;
	}
	width: 100%;
	margin-top: 2rem;
	background: #111;
	border-radius: 12px;
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
