import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
{
    pokemons (query: { search: $search, filter: { type: $type }}) {
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
}
`;