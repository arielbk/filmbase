import styled from 'styled-components';
import { $medGrey, $brandGreen } from '../../assets/vars.styled';

const StyledButton = styled.button`
	padding: 1rem 2rem;
	border-radius: 3px;
	border: none;
	font-size: 0.9rem;
	background: #111;
	color: ${$brandGreen};
	margin: 0 2rem;

	:hover {
		cursor: pointer;
		background: ${$medGrey};
	}
`;

export default StyledButton;
