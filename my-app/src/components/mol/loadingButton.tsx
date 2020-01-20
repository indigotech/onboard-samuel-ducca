import styled from 'styled-components'
import { FC } from 'react'
import { Button } from '../atm/button';
import React from 'react';


export interface LoadingButtonProps{
  isLoading: boolean,
  disabled: boolean,
  text: string,
  onClick: (event: any) => void,
}

export const LoadingButton: FC<LoadingButtonProps> = props => {

  return(
    <Button onClick={props.onClick} disabled={props.disabled}>
      <i className={props.isLoading ? 'fa fa-circle-o-notch fa-spin' : ''}></i> {props.text}
    </Button>
  );

}
