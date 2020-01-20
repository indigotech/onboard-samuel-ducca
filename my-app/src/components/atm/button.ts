import styled from 'styled-components'
import { Color } from '../../constants'
interface ButtonProps {
  secondary?: boolean,
  large?: boolean,
  round?: boolean
}

export const Button = styled.button`
  min-height:44px;
  margin: ${(props : ButtonProps) => props.round ? ".5rem" : "4px 4px"};
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props : ButtonProps) => props.secondary ? Color.secondary : Color.primary};
  border: ${(props : ButtonProps) => props.secondary ? "1px solid lightgray" : "none"};
  color: ${(props : ButtonProps) => props.secondary ? "black" : "white"};
  padding: ${(props : ButtonProps) => props.round ? "" : "12px 20px"};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: ${(props : ButtonProps) => props.round ? "50%" : "15px"};

  width: ${(props : ButtonProps) => props.round ? "44px" : "50%"};
  max-width: ${(props : ButtonProps) => props.large ? "250px" : "150px"};
  :hover{
    background-color: ${(props : ButtonProps) => props.secondary ? "whitesmoke" : "rgb(65, 83, 35)"};
  }
  :disabled{
    opacity: 50%;
  }
`;
