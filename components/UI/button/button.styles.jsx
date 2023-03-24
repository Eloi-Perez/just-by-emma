import style from 'styled-components'

export const Button = style.button`
  align-items: center;
  background-color: ${(props) =>
  props.primaryColor ? 'var(--primary-color)' : 'var(--primary-color-transparent)'};
  border: 1px solid #dfdfdf;
  border-radius: 25px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  color: var(--font-color);
  cursor: pointer;
  display: flex;
  font-family: var(--main-font);
  font-size:  ${(props) => (props.md ? '1rem' : '1.75rem')};
  justify-content: center;
  line-height: 28px;
  // max-width: 50%;
  padding: 14px 22px;
  text-decoration: none;
  transition: all 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 250px;
  margin: 10% auto;

  &:active,
  &:hover {
  outline: 0;
}

  &:hover {
    background-color: #ffffff;
    border-color: rgba(0, 0, 0, 0.19);
  }
  
}

`
