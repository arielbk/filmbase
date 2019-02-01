import styled from 'styled-components';
import { $brandGreen, $lightGrey } from '../../assets/vars.styled';

export const StyledLogo = styled.span`
	transform: translate(-50%, 0);
	font-size: 2.3rem;
	text-decoration: none;
	margin: 0 3rem;
`;

export const StyledFilm = styled.span`
	text-transform: lowercase;
	color: ${$brandGreen};
`;

export const StyledBase = styled.span`
	text-transform: uppercase;
	color: ${$lightGrey};
`;
