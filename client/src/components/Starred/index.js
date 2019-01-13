import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setStarred } from '../../actions/starActions';

class Starred extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		setStarred: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { history, auth } = this.props;
		if (!auth.isAuthenticated) history.push('/');
		this.props.setStarred();
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const { starred } = this.props;
		return (
			<div>
				<h1>Starred Films</h1>
				{isAuthenticated ? (
					<div>
						<ul>{starred && starred.starred.map(film => <li key={film.id}>{film.title}</li>)}</ul>
					</div>
				) : (
					<div>
						<h2>You must be logged in to view your favourited films</h2>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	starred: state.starred,
});

export default connect(
	mapStateToProps,
	{ setStarred }
)(withRouter(Starred));
