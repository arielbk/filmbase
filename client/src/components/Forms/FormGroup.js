import React, { Component } from 'react';

import { StyledFormGroup } from './FormGroup.styled';

export default class FormGroup extends Component {
	static defaultProps = {
		type: 'text',
	};

	render() {
		const { name, prettyName, type, value, onChange, errors } = this.props;
		return (
			<StyledFormGroup htmlFor="name">
				<input name={name} type={type} value={value} placeholder={prettyName} onChange={onChange} />
				{errors[name] && <small>{errors[name]}</small>}
			</StyledFormGroup>
		);
	}
}
