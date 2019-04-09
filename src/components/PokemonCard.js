import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    click: true
  }

  handleImageClick = () => {
    this.setState({
      click: !this.state.click
    })
  }

  findHP = () => {
    this.props.pokemon.stats.find(stat => stat.name === 'hp').value
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleImageClick}>
            <img alt="oh no!" src={this.state.click ? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back }/>
          </div>
          <div className="content">
            <div className="header">
            {this.props.pokemon.name}
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHP()}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
