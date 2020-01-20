import styled from 'styled-components'

interface CaptionProps {
  error?: boolean;
}

export const Caption = styled.label`
  font-size: 12px;
  font-weight:normal;
  color: crimson;
  margin-bottom: 12px;
  margin-top:4px;
  display:block;
  visibility: ${(props : CaptionProps) => props.error ? "visible" : "hidden"};
`;
