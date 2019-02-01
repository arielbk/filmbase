import styled from 'styled-components';
import StyledButton from '../Forms/Button.styled';
import { $brandGreen, $darkGreen, $lightGrey, $medGrey, $darkGrey } from '../../assets/vars.styled';

export const MovieWrapper = styled.div`
	position: relative;
`;

export const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: url(${props => props.backdrop}) center no-repeat;
	background-size: cover;
	z-index: -1;
	filter: blur(10px);
`;

export const MovieInfo = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(10, 10, 10, 1));
	min-height: 100vh;
	text-align: left;
	padding: 3rem 5%;
	display: flex;
	justify-content: center;

	@media (max-width: 760px) {
		display: block;
	}

	@media (max-width: 360px) {
		padding: 6rem 1rem;
	}
`;

export const MainContent = styled.div`
	padding: 0 0 2rem 2rem;
	max-width: 850px;
	overflow: auto;
	h1 {
		margin-bottom: 0.4rem;
		text-shadow: 1px 6px 22px #000;
	}

	@media (max-width: 760px) {
		padding: 0;
	}
`;

export const SidePanel = styled.div`
	position: relative;
	margin: 0 1rem;
	width: 186px;

	@media (max-width: 760px) {
		margin: 0 auto;
	}
`;

export const GenreTab = styled.div`
	display: inline-block;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 3px;
	color: #ddd;
	padding: 0.2rem 0.4rem;
	margin: 0.2rem;
	text-align: center;

	:last-child {
		margin-bottom: 2rem;
	}
`;

export const Votes = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 0 auto 1rem;
	padding: 0.4rem 0.9rem 1rem 0.2rem;
	text-align: center;
	border-radius: 22px;
	div {
		margin-top: 0.5rem;
	}
`;

export const SideStat = styled.div`
	font-size: 0.8rem;
	margin-bottom: 2rem;

	span {
		color: ${$lightGrey};
	}
	h3 {
		margin: 0.4rem;
		font-size: 1.4rem;
		// text-align: center;
		font-weight: 400;
	}
`;

export const Overview = styled.p`
	line-height: 1.5;
	margin-bottom: 3rem;
`;

export const Title = styled.div`
	display: inline-block;
	margin-bottom: 1rem;
	width: auto;

	h4 {
		color: ${$lightGrey};
		font-weight: 400;
		margin: 0.3rem 0;
	}
`;

export const MainTitle = styled(Title)`
	@media (max-width: 760px) {
		display: none;
	}
`;

export const SideTitle = styled(Title)`
	@media (min-width: 760px) {
		display: none;
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.125rem;
	width: 3.125rem;
	border-radius: 22px;
	font-size: 1.5rem;
	font-weight: 400;
	transition: 0.3s;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	background: #111;
	color: #eee;
	border: 1px solid ${$brandGreen};
	:hover {
		cursor: pointer;
		background: ${$brandGreen};
	}
`;

export const BackButton = styled.div`
	position: fixed;
	top: 9.5rem;
	left: 0;
	cursor: pointer;
	transition: 0.3s;
	opacity: 0.5;
	padding: 1rem;

	svg {
		stroke: ${$lightGrey};
		stroke-width: 3;
	}

	&:hover {
		opacity: 1;
		svg {
			stroke: ${$brandGreen};
		}
	}
`;

export const RelatedFilms = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 1rem;
	margin: 2rem 0;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.4);
	max-width: 100%;
	text-align: center;

	h4 {
		color: ${$lightGrey};
		margin: 0;
	}
	h3 {
		margin: 0.8rem 0;
	}
	img {
		border-radius: 3px;
	}
`;

export const HeartButton = styled(StyledButton)`
	margin: 0 0 3rem;
	border: none;
	width: 90%;
	position: relative;
	transition: 0.2s;

	&:before {
		content: '♥';
		position: absolute;
		left: 1.5rem;
		top: 0.6rem;
		font-size: 1.4rem;
	}
`;

export const UnheartButton = styled(HeartButton)`
	background: ${$darkGreen};
	color: ${$darkGrey};

	&:hover {
		background: ${$brandGreen};
		color: ${$medGrey};
	}

	&:before {
		opacity: 0.3;
	}
`;
