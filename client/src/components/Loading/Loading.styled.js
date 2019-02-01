import styled, { keyframes } from 'styled-components';
import { $brandGreen, $lightGrey } from '../../assets/vars.styled';

// Variables
const animTime = '1s';
const diameter = '100px';
const travel = '25px';
const borderThickness = '3px';
const colorOne = $brandGreen;
const colorTwo = $lightGrey;

export const StyledLoader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 40vh;
	margin: 3rem 0 5rem;
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

export const windOne = keyframes`
0% {
  opacity: 0.6;
  transform: translate(-${travel}, 0) scale(0.8);
}
25% {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}
50% {
  opacity: 0.6;
  transform: translate(${travel}, 0) scale(0.8);
}
75% {
  opacity: 0.4;
  transform: translate(0, 0) scale(0.6);
}
100% {
  opacity: 0.6;
  transform: translate(-${travel}, 0) scale(0.8);
}
`;

export const windTwo = keyframes`
0% {
  opacity: 0.6;
  transform: translate(${travel}, 0) scale(0.8);
}
25% {
  opacity: 0.4;
  transform: translate(0, 0) scale(0.6);
}
50% {
  opacity: 0.6;
  transform: translate(-${travel}, 0) scale(0.8);
}
75% {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}
100% {
  opacity: 0.6;
  transform: translate(${travel}, 0) scale(0.8);
}
`;

// export const WindTwo = keyframes`
//   0% {
//     background-color: #5EB94E;
//     transform: rotateY(0deg)
//   }
//   25% {
//     background-color: #3B7F2F;
//   }
//   50% {
//     background-color: #5EB94E;
//     transform: rotateY(180deg)
//   }
//   100% {
//     background-color: #5EB94E;
//     transform: rotateY(180deg) translateY(-100%)
//   }
// `;

export const Circle = styled.div`
	position: absolute;
	border-radius: 100%;
	width: ${diameter};
	height: ${diameter};
	animation-duration: ${animTime};
	animation-iteration-count: infinite;
	animation-timing-function: linear;
`;

export const CircleOne = styled(Circle)`
	border: ${borderThickness} solid ${colorOne};
	animation-name: ${windOne};
	animation-direction: normal;
`;

export const CircleTwo = styled(Circle)`
	border: ${borderThickness} solid ${colorTwo};
	animation-name: ${windTwo};
	// animation-delay: calc(${animTime} / 2);
`;
