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
    };
    
  }

  componentDidMount() {
    $.ajax({
      url: '/', 
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

  setUser (event) {
    console.log('user set');
    this.setState({
      user: event.target.value
    });
    // this.postUser(this.state.user);
    // this.handlePost();
  }

  // postUser(user){
  //   console.log('posting user', user);
  //   $.ajax({
  //     url: 'http://127.0.0.1:3000/',
  //     // type: 'POST',
  //     type: 'GET',
  //     data: JSON.stringify(user),
  //     contentType: 'application/json',
  //     success: (data) => {
  //       console.log('data in PostUser' , data);
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  handlePost (event){
    event.preventDefault();
    var req = {};
    req.user = this.state.user;
    console.log('req.user', req.user)

    $.ajax({
      url: 'http://127.0.0.1:3000',
      type: 'POST',
      data: JSON.stringify(req),
      contentType: 'application/json',
      success: (data) => {
        console.log('data in handlePost:' , data);
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
      Enter Trainer Name: 
      <input type ="text" onChange ={this.setUser.bind(this)}/>
      <button className='setUser' onClick= {this.handlePost.bind(this)}>Submit</button>

      <input type="text" onKeyUp={this.setQuery.bind(this)}/>
      <button className='addPokemon' onClick={this.addPokemon.bind(this, this.state.searchedPokemon)}>Add Pokemon</button>
      <List items={this.state.items}/>
      
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));