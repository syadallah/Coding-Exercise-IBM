import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS, POKEMON_TYPES } from "../../apollo/queries";

const ItemsContainer = () => {
  const { loading: loadingPokemons, data } = useQuery(GET_POKEMONS);
  const { loading: loadingTypes, data: types } = useQuery(POKEMON_TYPES);

  if (loadingPokemons || loadingTypes) return null;
  return (
    <div>
      <h2>Types:</h2>
      <ul>
        {types.pokemonTypes.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
      <h2>All pokemons:</h2>
      <ul>
        {data.pokemons.edges.map((e) => (
          <li>{e.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsContainer;
