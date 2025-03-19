import { safePromise } from "@/lib/safe-promise";
import PokeAPI from "pokedex-promise-v2";
import { cache } from "react";

let _client;

export const poke = new Proxy(
  {},
  {
    get(_, prop) {
      _client ??= new PokeAPI();
      return Reflect.get(_client, prop);
    },
  }
) as PokeAPI;

export const getPokemonByName = cache(async (name: string) => {
  return safePromise(poke.getPokemonByName(decodeURIComponent(name)));
});

export const getSpeciesByName = cache(async (name: string) => {
  return safePromise(poke.getPokemonSpeciesByName(decodeURIComponent(name)));
});
