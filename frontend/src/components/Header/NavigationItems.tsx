import React, { useState, useCallback } from "react";
import NavigationItem from "./NavigationItem";
import { getAllPokemons } from "../../services/api-services";
import { Pokemon } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../../apollo/queries";

const navigationItems = () => {
  // const [res, setRes] = useState<Pokemon[]>([]);
  // getAllPokemons().then((d) => setRes(d));
  const res = useQuery(GET_POKEMONS, {
    variables: { search: "", type: "" }
  });
  if (res.loading){
    return null;
  }
  debugger;
  return (
    <ul className="navigationItems">
      <NavigationItem link="/">All</NavigationItem>
      <NavigationItem link="/favorites">Favorites</NavigationItem>
      {res.data}
    </ul>
  );
};

export default navigationItems;
