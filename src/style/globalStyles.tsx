import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    background-color: #f7f7f7;
    /* Color */
    --color-black: #040509;
    --color-white: #fff;
    --color-dark-grey: #24262b;
    --color-grey: #4b4d53;
    --color-light-grey: #b6b9bf;
    --color-orange: #f74440;
    --color-stroke: #e9e9f2;
    --color-background: #fafaff;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    width: 500px;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    background-color: var(--color-white);
    color: var(--color-black);
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: var(--color-black);
  }
  button {
    display: flex;
    cursor: pointer;
    outline: none;
    border-radius: 8px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: var(--color-black);
    color: var(--color-white);
  };
  input {
    display: flex;
    outline: none;
    height: 50px;
    padding-left: 10px;
    border: 1px solid var(--color-stroke);
    border-radius: 8px;
    background-color: var(--color-background);
  }
  ::selection {
    color: white;
    background-color: var(--color-orange);
  }
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export default GlobalStyles;