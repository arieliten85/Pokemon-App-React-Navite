import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '../themes/appThemes';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokeminList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokeminList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 30,
              }}>
              Poquedex
            </Text>
          }
          renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
          //infinit scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};
