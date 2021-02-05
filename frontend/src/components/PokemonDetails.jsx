import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useQuery } from "@apollo/client";
import { POKEMON_BY_NAME } from "../apollo/queries";

const PokemonDetails = (props) => {
  const name = props.match.params.name;
  const { loading, data } = useQuery(POKEMON_BY_NAME, {
		variables: { name }
	});
  if (loading) return null;
  const pokemon = data.pokemonByName;
  return pokemon ? (
    <div>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="cardHeader">
        <span>
          <h4>{pokemon.name}</h4>
          <p>{pokemon.types.join(", ")}</p>
        </span>
        <span>
          {pokemon.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>
      </div>
    </div>
  ) : (
    <div>Pokemon {name} Not Found</div>
  );
};

export default PokemonDetails;
