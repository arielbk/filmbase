import styled from 'styled-components';
import { $lightGrey } from '../../assets/vars.styled';

export const StyledSearchButton = styled.input`
	padding: 1rem;
	margin: 0 2rem;
	border-radius: 22px;
	font-size: 1rem;
	transition: 0.3s;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	background: #464646;
	padding: 1rem 2rem;
	max-width: 8rem;
	border: none;
	transition: 0.3s;

	::placeholder {
		color: #111;
	}

	:focus {
		max-width: 300px;
		background: #ccc;

		::placeholder {
			color: ${$lightGrey};
		}
	}

	:hover {
		background: #ccc;
	}

	@media (max-width: 760px) {
		position: relative;
		top: 1.5rem;
		left: 0;
	}
`;
