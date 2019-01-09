import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { StyledNavbar, Logo, NavLink, AuthControl } from './Navbar.styled';
import { logoutUser } from '../../actions/authActions';
import logo from '../../assets/images/logo.svg';
import SearchButton from '../SearchButton';
import StyledButton from '../Forms/Button.styled';

// TODO: The navbar scrolls away normally, but when the user scrolls up ( wherever they are on the page ) it comes into view

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sticky: false,
			prevScrollPosition: 0,
		};
		this.navRef = React.createRef();
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	componentDidMount = () => {
		window.addEventListener('scroll', _.throttle(this.onScroll, 300));
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', _.throttle(this.onScroll, 300));
	};

	onScroll = () => {
		const { sticky, prevScrollPosition } = this.state;

		if (!sticky && window.scrollY > 176 && window.scrollY < prevScrollPosition) {
			this.setState({ sticky: true });
		}
		if (sticky && (window.scrollY < 176 || window.scrollY > prevScrollPosition)) {
			this.setState({ sticky: false });
		}

		this.setState({ prevScrollPosition: window.scrollY });
	};

	handleLogout = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { sticky } = this.state;

		return (
			<StyledNavbar ref={this.navRef} sticky={sticky}>
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
