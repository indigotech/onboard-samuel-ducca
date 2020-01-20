import React from "react";
import { User } from "../../types";
import { ListItem } from "./ListItem";

export interface ListProps {
  list: User[];
  onClick: (id:number) => void
}

export const List: React.FC<ListProps> = props => (
  <table>
    <tbody>
    {props.list.map((item : User) => (
        <ListItem key={item.id} item={item} onClick={props.onClick}/>
    ))}
    </tbody>
  </table>
);
