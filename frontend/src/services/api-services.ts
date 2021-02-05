import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../apollo/queries";
import { Pokemon } from "../types";

export const getAllPokemons = () => getPokemons("", "");

export const getPokemons = (search: string, type: string) => 
  new Promise<Pokemon[]>((res, rej) => {
    useQuery<Pokemon[]>(GET_POKEMONS, {
      variables: { search, type },
      onError: rej,
      onCompleted: res
    });
  });
