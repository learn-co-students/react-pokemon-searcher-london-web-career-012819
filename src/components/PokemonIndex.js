import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchTerm: ""
  }

  componentDidMount(){
      fetch('http://localhost:3000/pokemon')
        .then(resp => resp.json())
        .then(pokemons => {
          this.setState({
            pokemons
          })
        })
  }

  handleSearch = (e, {value}) => {
    this.setState({
      searchTerm: value
    })
  }

  createPokemon = pokemonObj => {
    fetch('http://localhost:3000/pokemon', {
      method: "post",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify(pokemonObj)
    }).then(resp => resp.json()).then(
      this.setState({
        pokemons: [...this.state.pokemons, pokemonObj]
      })
    )
  }

  pokemonsFilter = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.pokemonsFilter()} />
        <br />
        <PokemonForm createPokemon={this.createPokemon} />
      </div>
    )
  }
}

export default PokemonPage
