import React from 'react';
import { Label } from '../atm/label';
import { Caption } from '../atm/caption';
import { Select } from '../atm/select';
import { valueFromAST } from 'graphql';

export interface OptionType{
  value: string | number,
  text: string
}

export interface InputSelectProps{
  name: string,
  value: any,
  options: OptionType[],
  error?: boolean,
  label?: string,
  errorCaption?: string,
  onChange: (event: any) => void,
}

export const InputSelect: React.FC<InputSelectProps> = props => {

  return(
    <div>
      <Label error={props.error}>{props.label}</Label>
      <Select name={props.name} value={props.value} onChange={props.onChange}>
        {props.options.map((item : OptionType) => (
        <option key={item.text} value={item.value}> {item.text}</option>
        ))}
      </ Select>
      <br/>
      <Caption error={props.error}> {props.errorCaption} </Caption>
    </div>
  );

}
