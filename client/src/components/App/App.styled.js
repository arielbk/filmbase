import styled, { createGlobalStyle } from 'styled-components';

import { $brandGreen, $darkGrey } from '../../assets/vars.styled';

export const StyledApp = styled.div`
	text-align: center;
	padding-top: 4.8rem;
`;

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    outline-color: ${$brandGreen};
  }

  body {
    background: ${$darkGrey};
    color: #ccc;
    margin: 0;
    padding: 0;
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  h1 {
    margin-top: 3rem;
  }
`;
