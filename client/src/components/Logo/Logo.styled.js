import styled from 'styled-components';
import { $brandGreen, $lightGrey } from '../../assets/vars.styled';

export const StyledLogo = styled.span`
	position: absolute;
	left: 50%;
	top: 1rem;
	transform: translate(-50%, 0);
	font-size: 2.5rem;
`;

export const StyledFilm = styled.span`
	text-transform: lowercase;
	color: ${$brandGreen};
`;

export const StyledBase = styled.span`
	text-transform: uppercase;
	color: ${$lightGrey};
`;