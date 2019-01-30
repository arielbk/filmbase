import styled from 'styled-components';
import { $lightGrey, $medGrey } from '../../assets/vars.styled';

export const SearchBadge = styled.div``;

export const SearchInput = styled.input`
	padding: 0.8rem;
	margin: 0 2rem;
	border-radius: 22px;
	background: #111;
	color: ${$lightGrey};
	border: none;
	transition: 0.3s;
	max-width: 80px;
	// height: 60px;
	font-size: 1rem;

	::placeholder {
		color: ${$lightGrey};
	}

	:focus {
		max-width: 300px;
		border-radius: 22px;

		::placeholder {
			color: ${$lightGrey};
		}
	}
`;
