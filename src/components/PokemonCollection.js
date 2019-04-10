import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'
import PokemonForm from './PokemonForm'



class PokemonCollection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: []
    }   
  }

  addPokemon = (newPokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, newPokemon]
    })
  }


  componentDidMount(){
    fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        pokemon: data  
      }) 
    }) 
  }

  matchSearch = () => {
    return this.state.pokemon.filter(pokemon => {
      return pokemon.name.includes(this.props.searchTerm)
    })
  }
  

  render() {
    return (
      <div>
        <Card.Group itemsPerRow={6}>
        {this.matchSearch().map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} /> )}
          <h1>Hello From Pokemon Collection</h1>
        </Card.Group>
        <br/>
        <PokemonForm addPokemon={this.addPokemon} />
      </div>
    )
  }
}


export default PokemonCollection
