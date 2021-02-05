import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const PokemonDetails = (props) => {
  const { pokemon } = props;
  const name = props.match.params.name;
  return pokemon ? (
    <div>
      <img src={pokemon.img} alt={pokemon.name} />
      <div className="cardHeader">
        <span>
          <h4>{pokemon.name}</h4>
          <p>{pokemon.types.join(", ")}</p>
        </span>
        <span>
          {pokemon.isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>
      </div>
    </div>
  ) : (
    <div>Pokemon {name} Not Found</div>
  );
};

export default PokemonDetails;
