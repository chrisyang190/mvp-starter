import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import examplePokemonData from './examplePokemonData/examplePokemonData.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: examplePokemonData,
      searchedPokemon: null
      // items: []
    }
  }

  addPokemon (number) {
    console.log('clicked');
    var context = this;
    console.log('context', context);
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/' + number + '/',
      success: (data) => {
        console.log('name' , data.name);
        data.name = data.name.slice(0,1).toUpperCase() + data.name.slice(1);
        examplePokemonData.push(data);
        context.setState({
          items: examplePokemonData
          // items: this.state.examplePokemonData.concat([data])
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  setQuery (event) {
    this.setState({
      searchedPokemon: event.target.value.toLowerCase()
    })
  }
  // componentDidMount() {
  //   $.ajax({
  //     url: 'http://pokeapi.co/api/v2/pokemon/1/',
  //     success: (data) => {
  //       console.log(data);
  //       console.log(this.state.items);
  //       var newTeam = this.state.items.push(data);
  //       console.log('new Team', newTeam);
  //       // this.setState({
  //       //   items: data;
  //       // })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  render () {
    return (<div>
      <h1>Pokemon Team Builder</h1>
      <List items={this.state.items}/>
      <input type="text" onKeyUp={this.setQuery.bind(this)}/>
      <button className='addPokemon' onClick={this.addPokemon.bind(this, this.state.searchedPokemon)}>Add Pokemon</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));