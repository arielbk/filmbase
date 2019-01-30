import styled from 'styled-components';
import { $brandGreen, $lightGrey, $medGrey } from '../../assets/vars.styled';

export const StyledLoadMore = styled.div`
	display: inline-block;
	margin: 2rem auto;
	padding: 0.5rem;
	width: 200px;
	border-radius: 3px;
	background: ${$brandGreen};
	color: ${$medGrey};

	display: flex;
	justify-content: center;
	align-items: center;
`;
