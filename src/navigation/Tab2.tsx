import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParams} from './Navigation';
import {SearchSreen} from '../screens/SearchSreen';
import {PokemonScreen} from '../screens/PokemonScreen';

const Tab2 = createStackNavigator<RootStackParams>();

export const Tab2Screen = () => {
  return (
    <Tab2.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab2.Screen name="HomeScreen" component={SearchSreen} />
      <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab2.Navigator>
  );
};
