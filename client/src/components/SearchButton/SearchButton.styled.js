import styled from 'styled-components';
import { $brandGreen, $lightGrey, $medGrey } from '../../assets/vars.styled';

export const SearchForm = styled.form`
	position: relative;
	margin-right: 2rem;
`;

export const SearchInput = styled.input`
	border-radius: 22px;
	background: #111;
	color: ${$lightGrey};
	border: none;
	transition: 0.3s;
	height: 44px;
	font-size: 1rem;
	padding-left: 3rem;
	}

	:focus {
		// space to account for left icon
		padding: 0.8rem 0.8rem 0.8rem 2.8rem;
		border-radius: 22px;
	}

	@media (max-width: 650px) {
		max-width: 44px;
		margin-right: -1rem;

		&:focus {
			max-width: 169px;
		}
	}

	&::placeholder {
		color: ${$medGrey};
	}
`;

export const SearchIcon = styled.div`
	position: absolute;
	left: 5px;
	top: 4px;
	cursor: text;

	svg {
		fill: ${$lightGrey};
	}

	&:hover,
	${SearchInput}:focus ~ & {
		svg {
			fill: ${$brandGreen};
		}
	}
`;
