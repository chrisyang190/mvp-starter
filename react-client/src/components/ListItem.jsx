import React from 'react';

const ListItem = (props) => (
  <div>
    <div> {props.item.name} </div>
    <img className="sprite" src={props.item.image} alt="" />
  </div>
)

export default ListItem;