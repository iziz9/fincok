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
    --color-bank-green: #7ACF7D;
    --color-bank-puple: #bb90f4;
    --color-bank-lightgreen: #9EFF00;
    --color-bank-sky: #34C2EF;
    --color-bank-orange: #FF9E44;
    --color-bank-teal: #6CA9AD;
  }
  @font-face {
    font-family: 'SCoreDream';
    font-weight: lighter;
    font-style: normal; 
    src: url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream2.woff2) format('woff2'),
         url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream2.woff) format('woff');
    font-display: swap;
  }
  @font-face {
      font-family: 'SCoreDream';
      font-weight: normal; 
      font-style: normal; 
      src: url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream4.woff2) format('woff2'),
          url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream4.woff) format('woff');
      font-display: swap;
  }
  @font-face {
      font-family: 'SCoreDream';
      font-weight: bold; 
      font-style: normal; 
      src: url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream6.woff2) format('woff2'),
          url(https://cdn.jsdelivr.net/gh/webfontworld/SCoreDream/SCoreDream6.woff) format('woff');
      font-display: swap;
  }
  body {
    width: 500px;
    min-height: 100vh;
    height: 100%;
    margin: 0 auto;
    font-family: 'SCoreDream', sans-serif;
    font-size: 14px;
    background-color: var(--color-white);
    color: var(--color-black);
    position: relative;
    padding-top: 75px;
    padding-bottom: 75px;
    box-sizing: border-box;
  }
  h1 {
    font-size: 35px;
    margin: 25px 0 0;
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
    border: none;
    border-radius: 8px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: var(--color-black);
    color: var(--color-white);
    font-weight: bold;

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
    z-index: 100;
  }
  .popup-overlay {
    // background-color: rgba(243, 185, 152, 0.7);
    background-color: beige;
    width: 300px;
    text-align: center;
    padding: 30px;
    border-radius: 10px;
  }
  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.7);
  }
  .confirm-container {
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
      width: 100px;
    }
  }
`;

export default GlobalStyles;
