import React from 'react'
import { Card } from 'semantic-ui-react'


class PokemonCard extends React.Component {

  state = {
    flip: false
  }

  handleClick = () => {
    this.setState({
      flip: !this.state.flip
    })
  }


  render() {
    const {sprites, name, stats} = this.props.pokemon
    return (
      <Card onClick={this.handleClick} >
        <div>
            <div className="image">
                <img src={this.state.flip ? sprites.back : sprites.front} alt="oh no!" />
            </div>
            <div className="content">
                <div className="header">{name}</div>
            </div>
            <div className="extra content">
                <span>
                    <i className="icon heartbeat red" />
                    {stats[5].value}
                </span>
            </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
