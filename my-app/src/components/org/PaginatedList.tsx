import React from "react";
import { User } from "../../types";
import { List } from "../mol/List";
import { PaginationFooter } from "../mol/PaginationFooter"


export interface PaginatedListProps {
  list: User[],
  offset: number,
  limit: number,
  count: number,
  onClick: (id:number) => void,
  onChangePage: (amount:number) => void,

}

export const PaginatedList: React.FC<PaginatedListProps> = props => (
  <div>
    <List list={props.list} onClick={props.onClick}></List>
    <PaginationFooter offset={props.offset} limit={props.limit} count={props.count} onChangePage={props.onChangePage} ></PaginationFooter>
  </div>

);
