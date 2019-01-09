import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { $medGrey, $lightGrey } from '../../assets/vars.styled';

export const StyledNavbar = styled.div`
	background-color: ${$medGrey};
	height: 5.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: calc(10px + 2vmin);
	color: #111;
	width: 100%;
	transition: 0.3s;
	z-index: 999;

	${props =>
		props.sticky
			? `
		transform: translateY(0);
		top: 0;
		position: fixed;
		box-shadow: 0 3px 6px rgba(0,0,0,0.3);
		`
			: `
		position: absolute;
		transform: translateY(-88px);
		`}
`;

export const Logo = styled.img`
	position: absolute;
	left: 50%;
	top: 0.1rem;
	transform: translate(-50%, 0);
	margin: 2rem;
`;

export const NavLink = styled(Link)`
	color: #fff;
	margin: 0 2rem;
	padding: 1rem 2rem;
`;

export const AuthControl = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	font-size: 1rem;
	color: ${$lightGrey};
`;
