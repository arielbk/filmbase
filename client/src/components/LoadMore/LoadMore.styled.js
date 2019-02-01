import styled from 'styled-components';
import { $brandGreen, $medGrey } from '../../assets/vars.styled';

export const StyledLoadMore = styled.div`
	display: inline-block;
	font-size: 0.9rem;
	margin: 0 auto 5rem;
	padding: 1rem;
	width: 150px;
	border-radius: 22px;
	background: #111;
	transition: 0.3s;
	color: ${({ loading }) => (loading ? $medGrey : $brandGreen)};
	cursor: ${({ loading }) => (loading ? 'wait' : 'pointer')};

	&:hover {
		color: ${({ loading }) => (loading ? $medGrey : '#fff')};
	}

	display: flex;
	justify-content: center;
	align-items: center;
`;
