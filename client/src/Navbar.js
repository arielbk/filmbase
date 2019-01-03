import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';
import logo from './logo.svg';
import SearchButton from './SearchButton';

class Navbar extends Component {
	handleLogout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;

		return (
			<StyledNavbar>
				{/* force the movieslist component to refetch data... TODO: revise this */}
				<Link to="/" onClick={() => setTimeout(window.location.reload(true))}>
					<Logo src={logo} alt="logo" />
				</Link>
				<AuthControl>
					{isAuthenticated ? (
						<Fragment>
							<span>Signed in as {user.name}</span>
							<button onClick={this.handleLogout}>Logout</button>
							<NavLink to="/favourites">Favourites</NavLink>
						</Fragment>
					) : (
						<Fragment>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
						</Fragment>
					)}
				</AuthControl>
				<SearchButton />
			</StyledNavbar>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navbar);

const StyledNavbar = styled.div`
	background-color: #111;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: #111;
`;

const Logo = styled.img`
	margin: 2rem;
`;

const NavLink = styled(Link)`
	color: #fff;
`;

const AuthControl = styled.div`
	display: inline-flex;
	justify-content: space-around;
	align-items: flex-start;
	color: #ccc;
`;
