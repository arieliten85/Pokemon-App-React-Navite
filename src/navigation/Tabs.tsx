import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Navigation} from './Navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import {Tab2Screen} from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderWidth: 0,
          elevation: 0,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Navigation}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
