import styled from 'styled-components'

interface ButtonProps {
  secondary?: boolean,
  large?: boolean
}

export const Button = styled.button`
  min-height:44px;
  margin: 1rem;
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props : ButtonProps) => props.secondary ? "transparent" : "darkolivegreen"};
  border: ${(props : ButtonProps) => props.secondary ? "1px solid lightgray" : "none"};
  color: ${(props : ButtonProps) => props.secondary ? "black" : "white"};
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 4px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 15px;

  width: 50%;
  max-width: ${(props : ButtonProps) => props.large ? "250px" : "150px"};
  :hover{
    background-color: ${(props : ButtonProps) => props.secondary ? "whitesmoke" : "rgb(65, 83, 35)"};
  }
  :disabled{
    opacity: 50%;
  }
`;
