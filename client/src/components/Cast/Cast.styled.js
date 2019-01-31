import styled from 'styled-components';
import { $brandGreen } from '../../assets/vars.styled';

export const StyledCast = styled.div`
	margin-bottom: 2rem;
`;

export const CastGrid = styled.div`
	margin: 2rem auto;
	padding: 0 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-row-gap: 1rem;
	grid-column-gap: 1rem;

	@media (max-width: 920px) {
		grid-template-columns: repeat(1, 1fr);
	}

	@media (max-width: 760px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 630px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const CastMember = styled.div`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	background: rgba(0, 0, 0, 0.4);
	width: 100%;
	margin: 0 auto;
	padding: 0;
	border-radius: 3px;
`;

export const CastProfile = styled.img`
	width: 80px;
	border-radius: 3px 0 0 3px;
	margin-right: 1rem;
`;

export const CastDetails = styled.div`
	display: inline-block;
	width: 100%;
	padding: 0 1rem;
`;

export const CreditName = styled.h3`
	margin: 0.5rem 0;
`;

export const CreditCharacter = styled.h4`
	margin: 0;
	font-weight: 400;
	margin: 0.5rem 0;
`;

export const SeeMoreContainer = styled.div`
	width: 100%;
	text-align: center;
`;

export const SeeMore = styled.div`
	color: ${$brandGreen};
	display: inline-block;
	margin: 0 auto;
	text-align: center;
	width: 20%;
	background: rgba(0, 0, 0, 0.4);
	padding: 1rem;
	border-radius: 3px;
	cursor: pointer;
	transition: 0.3s;

	&:hover {
		color: #fff;
	}
`;
