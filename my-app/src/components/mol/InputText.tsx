import React from 'react';
import { Label } from '../atm/label';
import { Caption } from '../atm/caption';
import { Input } from '../atm/input';


export interface InputTextProps{
  name: string,
  value: any,
  label?: string,
  error?: boolean,
  errorCaption?: string,
  placeholder?: any,
  type?: string,
  onChange: (event: any) => void,
}

export const InputText: React.FC<InputTextProps> = props => {

  return(
    <div>
      <Label error={props.error}>{props.label}</Label>
      <Input error={props.error} placeholder={props.placeholder} type={props.type}
      name={props.name} value={props.value} onChange={props.onChange}/> <br/>
      <Caption error={props.error}> {props.errorCaption} </Caption>
    </div>
  );

}
