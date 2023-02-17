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
    --color-bg-grey: #F1F1F4;
    --color-orange: #f74440;
    --color-stroke: #e9e9f2;
    --color-background: #fafaff;
    --color-bank-yellow: #fedC32;
    --color-bank-blue: #4091dc;
    --color-bank-green: #1bd760;
    --color-bank-puple: #bb90f4;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap') format('font-woff');
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
    position: relative;
  }
  h1 {
    font-size: 35px;
    margin: 30px 0 0;
    font-weight: 600;
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

    :hover {
      border-color: var(--color-orange);
      background-color: var(--color-orange);
    }
  };
  input {
    display: flex;
    outline: none;
    height: 50px;
    padding-left: 20px;
    border: 1px solid var(--color-stroke);
    border-radius: 8px;
    background-color: var(--color-background);
    &::placeholder {
      color: var(--color-light-grey);
    }
  }
  ::selection {
    color: white;
    background-color: var(--color-orange);
  }
  select {
    height: 40px;
    padding: 10px;
    border-radius: 8px;
    font-size: 15px;

    :focus {
     outline: none;
    }
  }
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export default GlobalStyles;
