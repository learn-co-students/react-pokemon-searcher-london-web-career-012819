import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const POKEMON_URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    searchTerm: "",
    hpSort: 0
  }

  getPokemons = () => {
    fetch(POKEMON_URL)
      .then(resp => resp.json())
      .then(pokemons => {
        this.setState({pokemons: pokemons})
      })
  }

  handleSearch = (_, {value}) => this.setState({searchTerm: value})
  

  currentSearchPomkemons = (pokemons) => pokemons.filter(pokemon => pokemon.name.includes(this.state.searchTerm))

  filteredPokemons = (pokemons) => pokemons.filter(pokemon => pokemon.stats[pokemon.stats.length - 1].value >= this.state.hpSort)

  handleFilter = (event) => this.setState({hpSort: Number(event.target.value)})
  

  handleFormSubmit = ({name, hp, frontUrl, backUrl}) => {
    const body = {
      name,
      stats: [
        {
          name: "hp",
          value: hp
        }
      ],
      sprites: {front: frontUrl, back: backUrl}
    }
    fetch(POKEMON_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then(_ => this.setState({pokemons: [...this.state.pokemons, body]}))
  }

  componentDidMount() {
    this.getPokemons()
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleFormSubmit={this.handleFormSubmit}/>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <h4>Filter by hp of </h4>
          <select onChange={this.handleFilter} name="hp">
          <option value="0">none</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
          </select>
        <br/>
        <br/>
        <PokemonCollection pokemons={this.currentSearchPomkemons(this.filteredPokemons(this.state.pokemons))}/>
        
      </div>
    )
  }
}

export default PokemonPage
