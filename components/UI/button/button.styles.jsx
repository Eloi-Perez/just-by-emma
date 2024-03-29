import style from 'styled-components'

export const Button = style.button`
  align-items: center;
  background-color: ${(props) => (props.primaryColor ? 'var(--primary-color)' : 'gray')};
  border: 1px solid #dfdfdf;
  border-radius: 25px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => (props.primaryColor ? 'var(--font-color)' : '#fff')};
  cursor: pointer;
  display: flex;
  font-family: var(--main-font);
  font-size:  ${(props) => (props.primaryColor ? '1.5rem' : '1rem')};
  justify-content: center;
  line-height: 28px;
  padding: 14px 22px;
  text-decoration: none;
  transition: all 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 250px;

  &:active,
  &:hover {
  outline: 0;
}

  &:hover {
    opacity:0.5;
  }

  @media (max-width: 600px) {
    width:150px;
    font-size: ${(props) => (props.primaryColor ? '1rem' : '.5rem')};
    
  }
  
}

`
