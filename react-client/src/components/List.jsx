import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Pokemon Team </h4>
    <input type="text" onKeyUp={function(event) {props.setQuery(event.target.value);} }/>
    <button className='addPokemon' onClick={function(event) {props.addPokemon(props.searchedPokemon);} }>Add Pokemon</button>

    <h5>You have { props.items.length } on this team!</h5>
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default List;