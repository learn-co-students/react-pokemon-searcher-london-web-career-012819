import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'


class PokemonCollection extends React.Component {

  renderPokemons = () => this.props.pokemons.map(pokemon => <PokemonCard pokemon={pokemon}/>)

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemons()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
