import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { StyledNavbar, NavLink, AuthControl } from './Navbar.styled';
import { logoutUser } from '../../actions/authActions';
import Logo from '../Logo/Logo';
import SearchButton from '../SearchButton';
import StyledButton from '../Forms/Button.styled';

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

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const { logoutUser, history } = this.props;
		const { sticky } = this.state;

		return (
			<StyledNavbar ref={this.navRef} sticky={sticky}>
				<AuthControl>
					{isAuthenticated ? (
						<Fragment>
							<StyledButton onClick={() => logoutUser(history)}>Logout</StyledButton>
							<NavLink to="/hearted">Hearted</NavLink>
						</Fragment>
					) : (
						<Fragment>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
						</Fragment>
					)}
				</AuthControl>
				<Link to="/">
					<Logo />
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
)(withRouter(Navbar));
