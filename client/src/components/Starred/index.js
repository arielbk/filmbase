import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setStarred } from '../../actions/starActions';

class Starred extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		setStarred: PropTypes.func.isRequired,
	};

	componentDidMount() {
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
						<h2>This will be a list of the favourited movies</h2>
						<ul>{starred && starred.starred.map(film => <li key={film}>{film}</li>)}</ul>
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
)(Starred);
