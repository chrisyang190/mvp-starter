import React from 'react';

const ListItem = (props) => (
  <div>
    {props.item.name}
    <img className="sprite" src={props.item.sprites.front_default} alt="" />
  </div>
)

export default ListItem;