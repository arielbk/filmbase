import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchForm, SearchInput, SearchIcon } from './SearchButton.styled';

// passed as a default prop so it's easy to pass a mock function during testing
const handleSubmit = (e, input, history) => {
	e.preventDefault();
	if (input === '') return;
	history.push(`/search=${input}`);
};

class SearchButton extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

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
			<SearchForm
				data-testid="searchbutton-form"
				onSubmit={e => onSubmit(e, input, history)}
				onClick={() => this.inputRef.current.focus()}
			>
				<SearchInput
					data-testid="searchbutton-field"
					type="text"
					value={input}
					onChange={this.handleChange}
					ref={this.inputRef}
					aria-label="Search input"
				/>
				<SearchIcon>
					<svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px">
						<g id="icon-111-search">
							<path
								d="M19.4271164,21.4271164 C18.0372495,22.4174803 16.3366522,23 14.5,23 C9.80557939,23 6,19.1944206 6,14.5 C6,9.80557939 9.80557939,6 14.5,6 C19.1944206,6 23,9.80557939 23,14.5 C23,16.3366522 22.4174803,18.0372495 21.4271164,19.4271164 L27.0119176,25.0119176 C27.5621186,25.5621186 27.5575313,26.4424687 27.0117185,26.9882815 L26.9882815,27.0117185 C26.4438648,27.5561352 25.5576204,27.5576204 25.0119176,27.0119176 L19.4271164,21.4271164 L19.4271164,21.4271164 Z M14.5,21 C18.0898511,21 21,18.0898511 21,14.5 C21,10.9101489 18.0898511,8 14.5,8 C10.9101489,8 8,10.9101489 8,14.5 C8,18.0898511 10.9101489,21 14.5,21 L14.5,21 Z"
								id="search"
							/>
						</g>
					</svg>
				</SearchIcon>
			</SearchForm>
		);
	}
}

export default withRouter(SearchButton);
