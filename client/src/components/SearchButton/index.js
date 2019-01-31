import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchInput } from './SearchButton.styled';

// passed as a default prop so it's easy to pass a mock function during testing
const handleSubmit = (e, input, history) => {
	e.preventDefault();
	if (input === '') return;
	history.push(`/search=${input}`);
};

class SearchButton extends Component {
	state = {
		input: '',
	};

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		onSubmit: PropTypes.func,
	};

	static defaultProps = {
		onSubmit: handleSubmit,
	};

	handleChange = e => {
		this.setState({ input: e.target.value });
	};

	render() {
		const { input } = this.state;
		const { onSubmit, history } = this.props;
		return (
			<Fragment>
				<form data-testid="searchbutton-form" onSubmit={e => onSubmit(e, input, history)}>
					<SearchInput
						data-testid="searchbutton-field"
						placeholder="search"
						type="text"
						value={input}
						onChange={this.handleChange}
					/>
				</form>
			</Fragment>
		);
	}
}

export default withRouter(SearchButton);
