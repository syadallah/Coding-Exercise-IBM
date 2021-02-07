import React from 'react'
import ItemsContainer from './PokemonsContainer'
import { Route, Switch } from 'react-router-dom'
import PokemonDetails from './PokemonDetails'

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact component={ItemsContainer} />
      <Route path="/:name" component={PokemonDetails} />
    </Switch>
  </div>
)

export default App
