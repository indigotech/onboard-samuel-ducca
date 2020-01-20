import React from "react";
import { Button } from "../atm/button";


export interface FooterProps{
  offset: number,
  limit: number,
  count: number,
  onChangePage: (amount: number) => void
}

export const PaginationFooter: React.FC<FooterProps> = props => {

  return(
    <div>
      <Button secondary round onClick={() => props.onChangePage(-1)}> <i className="fa fa-chevron-left"></i> </Button>
      <span className='paginationText'>Página {Math.ceil(props.offset/props.limit)} de {Math.floor(props.count/props.limit)}</span>
      <Button secondary round onClick={() => props.onChangePage(+1)}> <i className="fa fa-chevron-right"></i> </Button>
  </div>
  );

};
