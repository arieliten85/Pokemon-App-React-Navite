import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

import ImageColors from 'react-native-image-colors';

interface Props {
  pokemon: SimplePokemon;
}
export const PokemonCard = ({pokemon}: Props) => {
  const widthScreem = Dimensions.get('window').width;
  const navigation: any = useNavigation();

  const isMounted = useRef(true);
  const [bgColor, setBgColor] = useState('grey');

  const colorCapture = async () => {
    const colors = await ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    });

    if (!isMounted.current) {
      return;
    }

    if (colors.platform === 'android') {
      setBgColor(colors.dominant || 'grey');
    }

    if (colors.platform === 'ios') {
      setBgColor(colors.background);
    }

    return () => {
      isMounted.current = false;
    };
  };
  useEffect(() => {
    colorCapture();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: widthScreem * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.containerPokebola}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebolaCard}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokeminImage} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,

    height: 120,

    marginBottom: 25,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  pokebolaCard: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.5,
  },
  pokeminImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: -8,
    bottom: -3,
  },
  containerPokebola: {
    overflow: 'hidden',
    flex: 1,
  },
});
