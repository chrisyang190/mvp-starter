import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import examplePokemonData from './examplePokemonData/examplePokemonData.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      items: [],
      searchedPokemon: null
      // items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  componentDidMount() {
    $.ajax({
      url: '/users', 
      success: (data) => {
        this.setState({
          items: []
        })
        console.log('data', data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  addPokemon (number) {
    console.log('clicked addPokemon');
    var context = this;
    console.log('context', context);
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/' + number + '/',
      success: (data) => {
        console.log('name' , data);
        var pokemon = {};
        pokemon.name = data.name.slice(0,1).toUpperCase() + data.name.slice(1);
        pokemon.image = data.sprites.front_default;
        this.state.items.push(pokemon);
        context.setState({
          items: this.state.items
          // items: this.state.examplePokemonData.concat([data])
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange (event) {
    console.log('user set');
    this.setState({
      user: event.target.value,
      items: []
    });
  }

   handleSubmit (event){
    event.preventDefault();
    var req = {};
    req.user = this.state.user;
    req.team = this.state.items;
    console.log('req.user', req.user);
    var context = this;

    $.ajax({
      url: '/users',
      type: 'POST',
      // data: JSON.stringify(req)
      data: JSON.stringify(req),
      contentType: 'application/json',
      success: (data) => {
        console.log('data in success function:' , data);
        context.setState({
          items: data.team
        })
      },
      error: (error) => {
        console.log('err', error);
      }
    })
  }

  setQuery (event) {
    this.setState({
      searchedPokemon: event.toLowerCase()
    })
  }

  saveTeam(event){
    console.log('team saved');
    var req = {};
    req.user = this.state.user;
    req.team = this.state.items;
    // console.log('req.user', req.user);
    console.log('req from save', req);
    var context = this;

    $.ajax({
      url: '/users/save',
      type: 'POST',
      // data: JSON.stringify(req)
      data: JSON.stringify(req),
      contentType: 'application/json',
      success: (data) => {
        console.log('data in success function:' , data);
        context.setState({
          items: data.team
        })
      },
      error: (error) => {
        console.log('err', error);
      }
    })
  }

  resetTeam (event) {
    this.setState({
      items: []
    })
  }

  render () {
    return (<div>
      <h1>Pokemon Team Builder</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          <div>Enter Trainer Name:</div>
          <input type="textarea" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Search" />
      </form>
      <List items={this.state.items} searchedPokemon={this.state.searchedPokemon} setQuery={this.setQuery.bind(this)} addPokemon={this.addPokemon.bind(this)}/>
      <button className='save' onClick={this.saveTeam.bind(this)}> Save Team </button>
      <button className='reset' onClick={this.resetTeam.bind(this)}> Reset Team </button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));