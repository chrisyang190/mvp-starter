import React from 'react';

const ListItem = (props) => (
  <div>
    {props.item.name}
    <img className="sprite" src={props.item.image} alt="" />
  </div>
)

export default ListItem;