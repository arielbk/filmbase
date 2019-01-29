import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setHearted } from '../../actions/heartActions';

class Hearted extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		setHearted: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const { history, auth } = this.props;
		if (!auth.isAuthenticated) history.push('/');
		this.props.setHearted();
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const { hearted } = this.props;
		return (
			<div>
				<h1>Hearted Films</h1>
				{isAuthenticated ? (
					<div>
						<ul>
							{hearted &&
								hearted.hearted.map(film => <li key={film.id}>{film.title}</li>)}
						</ul>
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
	hearted: state.hearted,
});

export default connect(
	mapStateToProps,
	{ setHearted }
)(withRouter(Hearted));
