import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from './actions/authActions';
import FormGroup from './FormGroup';
import StyledButton from './StyledButton';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {},
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = {
			name,
			email,
			password,
			password2,
		};
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		// TODO: separate repeated things into separate components
		const { name, email, password, password2, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup
					name="name"
					prettyName="Name"
					value={name}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="email"
					prettyName="Email"
					type="email"
					value={email}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password"
					prettyName="Password"
					type="password"
					value={password}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password2"
					prettyName="Confirm Password"
					type="password"
					value={password2}
					onChange={this.handleChange}
					errors={password2}
				/>
				<StyledButton type="submit">Submit</StyledButton>
			</form>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
