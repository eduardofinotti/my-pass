import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Home'
import FavoritosScreen from './Favoritos'
import DicasScreen from './Dicas'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const logo = require('./assets/mp-logo.png');

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#fff',
        style: {
          backgroundColor: '#191919',
        }
      }}
    >
      <Tab.Screen
        name="Dicas"
        component={DicasScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image style={{height: 55, width: 55}} source={logo}></Image>
          ),
        }}
      />   
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}