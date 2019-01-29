import styled from 'styled-components';
import { $medGrey } from '../../assets/vars.styled';

export const StyledFormGroup = styled.label`
	display: block;
	margin: 2rem 0;
	display: block;
	text-align: center;
	margin-bottom: 1rem;
	position: relative;

	&:first-child {
		margin-top: 3rem;
	}
	&:last-of-type {
		margin-bottom: 3rem;
	}

	input {
		background: #111;
		width: 90%;
		max-width: 430px;
		padding: 0.8rem;
		border-radius: 3px;
		box-shadow: none;
		border-style: solid;
		font-size: 1rem;
		border: none;
		color: #eee;

		&:focus,
		&:hover {
			background: ${$medGrey};
		}
	}
`;

export const ErrorText = styled.small`
	color: #8e2b2b;
	display: block;
	bottom: -1rem;
	font-size: 0.8rem;
`;
