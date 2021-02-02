import React from 'react'
import NavigationItem from './NavigationItem'

const navigationItems = () => {

    return (
      <ul className="navigationItems">
      <NavigationItem link='/'>All</NavigationItem>
      <NavigationItem link='/favorites'>Favorites</NavigationItem>

      </ul>
  )
}

export default navigationItems
