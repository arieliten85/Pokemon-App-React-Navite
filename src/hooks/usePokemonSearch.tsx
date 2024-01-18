import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';

import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [filterResults, setFilterResults] = useState<SimplePokemon[]>();

  const [isFeching, setIsFeching] = useState(false);
  const [simplePokeminList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const allPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1400',
    );

    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlSplited = url.split('/');
      const id = urlSplited[urlSplited.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });

    setSimplePokemonList(newPokemonList);
    setIsFeching(false);
  };

  const getFilterPokemon = (text: string) => {
    setIsFeching(true);
    const result = simplePokeminList.filter(poke =>
      poke.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    );

    if (text.trim() === '') {
      setIsFeching(false);
      setFilterResults([]);
    } else {
      setIsFeching(false);
      setFilterResults(result);
    }
  };

  useEffect(() => {
    allPokemons();
  }, []);

  return {
    isFeching,
    getFilterPokemon,
    filterResults,
  };
};
