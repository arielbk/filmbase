import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledNavbar, Logo, NavLink, AuthControl } from './Navbar.styled';
import { logoutUser } from '../../actions/authActions';
import logo from '../../assets/images/logo.svg';
import SearchButton from '../SearchButton';
import StyledButton from '../Forms/Button.styled';

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
				<AuthControl>
					{isAuthenticated ? (
						<Fragment>
							<StyledButton onClick={this.handleLogout}>Logout</StyledButton>
							<NavLink to="/favourites">Favourites</NavLink>
						</Fragment>
					) : (
						<Fragment>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
						</Fragment>
					)}
				</AuthControl>
				<Link to="/" onClick={() => setTimeout(window.location.reload(true))}>
					<Logo src={logo} alt="logo" />
				</Link>
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
