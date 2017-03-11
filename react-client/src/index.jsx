import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import examplePokemonData from './examplePokemonData/examplePokemonData.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: examplePokemonData
      // items: []
    }
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
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));