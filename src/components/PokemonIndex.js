import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const API = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({
      pokemons: data
    }))
  }

  handleSearch = (event, {value}) => {
    this.setState({
      searchTerm: value
    })
  }

  searchResultPokemons = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
  }


  addPokemon = newPokemon => {
    this.setState({
      pokemons: [...this.state.pokemons, newPokemon]
    })
  }


  render() {
    console.log(this.searchResultPokemons());
    console.log(this.state.searchTerm)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.searchResultPokemons()}/>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
