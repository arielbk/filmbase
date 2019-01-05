import styled from 'styled-components';

export const StyledSearchButton = styled.input`
	position: absolute;
	z-index: 10;
	padding: 1rem;
	border-radius: 22px;
	font-size: 1rem;
	transition: 0.3s;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	top: 2rem;
	right: 1rem;
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
			color: #777;
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
