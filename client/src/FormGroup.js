import React, { Component } from 'react';
import styled from 'styled-components';

export default class FormGroup extends Component {
	render() {
		const { name, prettyName, type, value, onChange, errors } = this.props;
		return (
			<StyledFormGroup htmlFor="name">
				{/* {prettyName}
				{': '} */}
				<input name={name} type={type} value={value} placeholder={prettyName} onChange={onChange} />
				{errors[name] && <small>{errors[name]}</small>}
			</StyledFormGroup>
		);
	}
}

FormGroup.defaultProps = {
	type: 'text',
};

const StyledFormGroup = styled.label`
	display: block;
	margin: 2rem 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	input {
		width: 50%;
		padding: 0.8rem;
		margin: 1rem;
		border-radius: 3px;
		box-shadow: none;
		border-style: solid;
		font-size: 1rem;
		border: none;
	}

	small {
		color: #d00;
		display: block;
	}
`;
