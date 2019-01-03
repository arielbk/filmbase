import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './actions/authActions';
import FormGroup from './FormGroup';
import StyledButton from './StyledButton';

class Login extends Component {
	state = {
		email: '',
		password: '',
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
		const { email, password } = this.state;
		const newUser = {
			email,
			password,
		};
		this.props.loginUser(newUser, this.props.history);
	};

	render() {
		const { email, password, errors } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup
					name="email"
					prettyName="Email"
					value={email}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password"
					prettyName="Password"
					value={password}
					type="password"
					onChange={this.handleChange}
					errors={errors}
				/>
				<StyledButton type="submit">Submit</StyledButton>
			</form>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login));
