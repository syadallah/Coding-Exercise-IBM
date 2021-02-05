import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
query ($search: String!, $type: String!){
    pokemons (query: { search: $search, filter: { type: $type }, limit: 1000}) {
        count
        limit
        offset
        edges {
            name
            types
            isFavorite
            image
        }
    }
}`;

export const POKEMON_TYPES = gql`
{
    pokemonTypes
}`;

export const POKEMON_BY_NAME = gql`
query ($name: String!){
  pokemonByName(name: $name) {
    name
    image
    sound
    isFavorite
    maxCP
    maxHP
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    evolutions {
      name
      image
      isFavorite
    }
  }
}
`;