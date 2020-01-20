import React from "react";
import { User } from "../../types";

export interface ListItemProps {
  key: number;
  item: User;
  onClick: (id:number) => void
}

export const ListItem: React.FC<ListItemProps> = props => (
  <tr>
    <td onClick={() => props.onClick(props.item.id)}>
      <h2>{props.item.name}</h2>
      <p>{props.item.email}</p>
    </td>
  </tr>
);
