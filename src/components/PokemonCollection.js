import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'



class PokemonCollection extends React.Component {

  state = {
    pokemon: []
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
    return this.state.pokemon.filter(pokemon => pokemon.name.includes(this.props.searchTerm))
  }
  

  render() {
    return (
      <Card.Group itemsPerRow={6}>
      {this.matchSearch().map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} /> )}
        <h1>Hello From Pokemon Collection</h1>
      </Card.Group>
    )
  }
}
{/* <PokemonCard pokemon={this.state.pokemon[0]}/> */}

export default PokemonCollection
