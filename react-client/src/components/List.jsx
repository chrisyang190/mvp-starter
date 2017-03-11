import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Pokemon Team </h4>
    You have { props.items.length } on this team!
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default List;