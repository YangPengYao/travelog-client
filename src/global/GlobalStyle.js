import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Noto Sans TC', sans-serif;
    vertical-align: baseline;
  }
  
  *:active, *:focus {
    outline: none;
  }

  body {
    position: relative;
    background-color: #fafafa;
    min-width: 320px;
  }

  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;
