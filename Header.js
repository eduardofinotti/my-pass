
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';

var logo = require('./assets/mp-logo.png');

export default function Header() {

  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>my password</Text>
          <Text style={styles.subtitle}>gere senhas aleatórias</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo}></Image>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? '5%' : '10%',
  },

  titleContainer: {
    paddingHorizontal: 15
  },  
  
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },  
  
  subtitle: {
    color: '#969696',
    fontSize: 21,
    fontWeight: 'bold'
  },

  logoContainer: {
    paddingHorizontal: 15
  },

  logo: {
    width: 50,
    height: 50,
  },
  
});
