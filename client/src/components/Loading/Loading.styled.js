import styled, { keyframes } from 'styled-components';

export const StyledLoader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 40vh;
	margin-bottom: 5rem;
	p {
		font-size: 0.8rem;
	}
`;

export const Container = styled.div`
	display: inline-block;
	height: 100px;
	width: 100px;
	position: relative;
	margin-bottom: 1rem;
`;

export const SquareOneAnimation = keyframes`
  0% {
    background-color: #5EB94E;
    transform: rotateY(0deg) 
  }
  25% {
    background-color: #3B7F2F;
  }
  50% {
    background-color: #5EB94E;
    transform: rotateY(180deg) 
  }
  100% { 
    background-color: #5EB94E;
    transform: rotateY(180deg) translateY(100%)
  }
`;

export const SquareTwoAnimation = keyframes`
  0% { 
    background-color: #5EB94E;
    transform: rotateY(0deg) 
  }
  25% {
    background-color: #3B7F2F;
  }
  50% { 
    background-color: #5EB94E;
    transform: rotateY(180deg) 
  }
  100% { 
    background-color: #5EB94E;
    transform: rotateY(180deg) translateY(-100%)
  }
`;

export const Square = styled.div`
	width: 50px;
	height: 50px;
	background: #5eb94e;
`;

export const SquareOne = styled(Square)`
	position: absolute;
	top: 0;
	left: 0;
	transform-origin: center right;
	animation: ${SquareOneAnimation} 1s infinite;
`;

export const SquareTwo = styled(Square)`
	position: absolute;
	right: 0;
	bottom: 0;
	transform-origin: center left;
	animation: ${SquareTwoAnimation} 1s infinite;
`;
