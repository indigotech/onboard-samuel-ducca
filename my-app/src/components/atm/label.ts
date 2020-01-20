import styled from 'styled-components'

interface LabelProps {
  error?: boolean;
}

export const Label = styled.label`
  font-size: 14px;
  font-weight:normal;
  display:block;
  color: ${(props : LabelProps) => props.error ? "crimson" : "black"};
  margin-bottom: 12px;
`;
