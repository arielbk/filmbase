import styled from 'styled-components';
import { $brandGreen, $lightGrey } from '../../assets/vars.styled';

export const StyledPageControls = styled.div`
	margin: 2rem auto;
	width: 300px;
	border-radius: 24px;
	background: #111;
	color: ${$lightGrey};

	display: flex;
	justify-content: space-between;
	align-items: space-between;

	div {
		padding: 0.5rem;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background: #111;
	}

	a {
		color: ${$lightGrey};
		text-decoration: none;
		font-size: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		display: inline-block;
		transition: 0.3s;

		:hover {
			color: ${$brandGreen};
		}
	}

	span {
		font-size: 1rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
`;
