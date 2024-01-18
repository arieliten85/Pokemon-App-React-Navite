import React, {useState} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';

import {styles as globalStyles} from '../themes/appThemes';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
export const SearchSreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFeching, filterResults, getFilterPokemon} = usePokemonSearch();
  const [textValue, setTextValue] = useState('');

  const handleChangeText = (text: string) => {
    setTextValue(text);
  };

  if (isFeching) {
    return <Loading />;
  }

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}>
        <SearchInput
          top={top}
          getFilterPokemon={getFilterPokemon}
          textValue={textValue}
          onChangeText={handleChangeText}
        />
        <FlatList
          data={filterResults}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //HEADER
          ListHeaderComponent={
            <Text
              style={{
                ...globalStyles.title,
                ...globalStyles.globalMargin,
                marginTop: top + 70,
                marginBottom: 10,
              }}>
              {textValue}
            </Text>
          }
          renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
          onEndReachedThreshold={0.4}
        />
      </View>
    </>
  );
};
export const styles = StyleSheet.create({
  pokebolaBG: {
    position: 'absolute',
    top: -100,
    right: -150,
    opacity: 0.2,
    width: 500,
    height: 500,
  },
});
