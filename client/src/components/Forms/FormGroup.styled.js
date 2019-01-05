import styled from 'styled-components';

export const StyledFormGroup = styled.label`
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
