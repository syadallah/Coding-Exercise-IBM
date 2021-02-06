import { gql } from "@apollo/client";

export const ADD_TO_FAVORITES = gql`
mutation ($id: ID!){
    favoritePokemon(id: $id) {
        id
        isFavorite
    }
}`;

export const REMOVE_FROM_FAVORITES = gql`
mutation ($id: ID!){
    unFavoritePokemon(id: $id) {
        id
        isFavorite
    }
}`;