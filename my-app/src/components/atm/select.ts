import styled from 'styled-components'

export const Select = styled.select`
  width: 70%;
  max-width: 300px;
  border:"2px solid lightgray";
  border-radius: 15px;
  padding: 12px 20px;
  box-sizing: border-box;
  outline: none;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  height: 40px;

  :focus{
    border: 2px solid #555;
  }
`
;
