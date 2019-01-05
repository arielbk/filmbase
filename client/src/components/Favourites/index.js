import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// The first thing I'll do with this page is just list the users favourited movie IDs

class Favourites extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
	};

	render() {
		const { isAuthenticated } = this.props.auth;
		const { list } = this.props;
		return (
			<div>
				<h1>Favourites</h1>
				{isAuthenticated ? (
					<div>
						<h2>This will be a list of the favourited movies</h2>
						<ul>{list.favFilms && list.favFilms.map(film => <li index={film}>{film}</li>)}</ul>
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
	list: state.list,
});

export default connect(mapStateToProps)(Favourites);
