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
      items: examplePokemonData,
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
          items: examplePokemonData
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
        examplePokemonData.push(pokemon);
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

  handleChange (event) {
    console.log('user set');
    this.setState({
      user: event.target.value
    });

    var req = {};
    req.user = this.state.user;
    // this.postUser(this.state.user);
    // this.handlePost();
    // var context = this;
    // $.ajax({
    //   url:'/users/pokemon',
    //   type: 'GET',
    //   data: JSON.stringify(req),
    //   contentType: 'application/json',
    //   success:(data)=> {
    //     console.log('data on get:', data);
    //     // context.setState({
    //     //   items: data.body.team;
    //     //   // items: this.state.examplePokemonData.concat([data])
    //     // })
    //   }
    // })
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
        console.log('user in Success FunctioN:', req.user);
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Trainer Name:
          <input type="textarea" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <input type="text" onKeyUp={this.setQuery.bind(this)}/>
      <button className='addPokemon' onClick={this.addPokemon.bind(this, this.state.searchedPokemon)}>Add Pokemon</button>
      <List items={this.state.items}/>
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));