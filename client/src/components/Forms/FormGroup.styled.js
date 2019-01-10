import styled from 'styled-components';
import { $medGrey } from '../../assets/vars.styled';

export const StyledFormGroup = styled.label`
	display: block;
	margin: 1rem 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	input {
		background: #111;
		width: 90%;
		max-width: 430px;
		padding: 0.8rem;
		margin: 1rem;
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

	small {
		color: #d00;
		display: block;
	}
`;
