import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNavbar = styled.div`
	background-color: #111;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: #111;
`;

export const Logo = styled.img`
	margin: 2rem;
`;

export const NavLink = styled(Link)`
	color: #fff;
`;

export const AuthControl = styled.div`
	display: inline-flex;
	justify-content: space-around;
	align-items: flex-start;
	color: #ccc;
`;
