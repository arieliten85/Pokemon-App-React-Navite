import React, {useEffect} from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

const screenWidth = Dimensions.get('window').width;
interface Props {
  top: number;
  getFilterPokemon: (text: string) => void;
  textValue: string;
  onChangeText: (text: string) => void;
}

export const SearchInput = ({
  top,
  getFilterPokemon,
  textValue,
  onChangeText,
}: Props) => {
  const deboncedValue = useDebouncedValue(textValue, 500);

  useEffect(() => {
    getFilterPokemon(deboncedValue);
  }, [deboncedValue]);

  return (
    <View
      style={{
        ...styles.container,
        top: top + 20,
      }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={onChangeText}
        />
        <Icon name="search-outline" color="grey" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth - 40,
  },
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
