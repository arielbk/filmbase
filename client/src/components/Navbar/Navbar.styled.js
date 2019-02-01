import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { $medGrey, $lightGrey, $brandGreen } from '../../assets/vars.styled';

export const StyledNavbar = styled.div`
	background-color: ${$medGrey};
	height: 4.8rem;
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
		transform: translateY(-4.8rem);
		`};
`;

export const NavLink = styled(Link)`
	color: ${$lightGrey};
	text-decoration: none;
	font-weight: 600;
	padding: 1rem;
	transition: 0.3s;
	:hover {
		color: ${$brandGreen};
	}
	@media (max-width: 800px) {
		display: none;
	}
`;

export const OptionsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 1rem;
	margin: 0;
	margin-right: 3rem;
`;
