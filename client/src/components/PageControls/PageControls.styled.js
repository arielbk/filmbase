import styled from 'styled-components';
import { $brandGreen } from '../../assets/vars.styled';

export const StyledPageControls = styled.div`
	margin: 2rem auto;
	width: 300px;
	border-radius: 12px;
	background: #111;

	display: flex;
	justify-content: space-between;
	align-items: space-between;

	div {
		padding: 0.5rem;
		width: 100px;
	}

	a {
		color: #ccc;
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
