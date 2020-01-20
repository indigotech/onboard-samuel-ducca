import styled from 'styled-components'

interface InputProps {
  error?: boolean;
}

export const Input = styled.input`
  width: 70%;
  max-width: 300px;
  border:${(props: InputProps) => props.error ? "2px solid crimson" : "2px solid lightgray"};
  border-radius: 15px;
  padding: 12px 20px;
  box-sizing: border-box;
  outline: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;

  :focus{
    border: 2px solid #555;
  }
`;
