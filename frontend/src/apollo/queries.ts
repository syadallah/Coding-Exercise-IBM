import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
{
    pokemons (query: { search: "", filter: { type: "" }, limit: 1000}) {
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

export const POKEMON_BY_ID = gql`
{
    pokemonByName(name: $name) {
    name,
    image,
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
  }
}
`;