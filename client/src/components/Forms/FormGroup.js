import React, { Component } from 'react';

import { StyledFormGroup, ErrorText } from './FormGroup.styled';

export default class FormGroup extends Component {
	static defaultProps = {
		type: 'text',
	};

	render() {
		const { name, prettyName, type, value, onChange, errors } = this.props;
		return (
			<StyledFormGroup htmlFor={name}>
				<input
					name={name}
					type={type}
					value={value}
					placeholder={prettyName}
					onChange={onChange}
				/>
				{errors[name] && <ErrorText>{errors[name]}</ErrorText>}
			</StyledFormGroup>
		);
	}
}
