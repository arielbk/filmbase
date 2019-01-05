import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledNavbar, Logo, NavLink, AuthControl } from './Navbar.styled';
import { logoutUser } from '../../actions/authActions';
import logo from '../../assets/images/logo.svg';
import SearchButton from '../SearchButton';

class Navbar extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

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

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navbar);
