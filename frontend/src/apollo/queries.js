import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
query ($search: String!, $type: String!, $limit: Int!, $offset: Int!){
  pokemons (query: { search: $search, filter: { type: $type }, limit: $limit, offset: $offset}) {
    count
    limit
    offset
    edges {
      id
      name
      types
      isFavorite
      image
    }
  }
}`;

export const GET_FAVORITE_POKEMONS = gql`
query ($search: String!, $type: String!, $limit: Int!, $offset: Int!){
  pokemons (query: { search: $search, filter: { type: $type, isFavorite: true }, limit: $limit, offset: $offset}) {
    count
    limit
    offset
    edges {
      id
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
    id
    name
    image
    sound
    types
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
      id
      name
      image
      isFavorite
    }
  }
}
`;