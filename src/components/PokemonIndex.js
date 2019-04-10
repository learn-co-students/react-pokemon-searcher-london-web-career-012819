import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      searchTerm: ""
    }
  }


  handleSearch = (e, { value }) => {
    this.setState({ searchTerm: value })
  }
  
  render() {
    console.log(this.state.searchTerm)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} value={this.state.searchTerm} showNoResults={false} />
        <br />
        <PokemonCollection searchTerm={this.state.searchTerm} />
        <br />

      </div>
    )
  }
}

export default PokemonPage
