
import React, {useEffect, useState} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Storage from '@react-native-community/async-storage';

import Header from './Header';

const DATA = [
  {
    password: 'First Item',
  },
  {
    password: 'Second Item',
  },
  {
    password: 'Third Item',
  },
];


export default function Favoritos() {

  const [passwords, setPasswords] = useState()

  useEffect(() => {

    setitem()

  }, [])

  async function setitem() {

    const productToBeSaved = { item: '123871937283'}

    await Storage.setItem('@passwords', JSON.stringify(productToBeSaved) )
      .then( ()=>{
        console.log(`It was saved successfully`)
      } )
      .catch( ()=>{
        console.log(`There was an error saving the product`)
      } )

      const existingProducts = await Storage.getItem('@passwords')
      setPasswords(JSON.parse(existingProducts))

  }

  return (
    <SafeAreaView style={styles.container}>

      <Header />
      
      <FlatList style={styles.scrollContainer}
        data={passwords}
        keyExtractor={item => item.password}
        renderItem={({ item }) => (
          <View style={styles.passwordContainer}>
            <Text style={styles.password}>aaa</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons name="trash-can-outline" color={'#fff'} size={20} />
            </TouchableOpacity>
            
          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
  },
  
  scrollContainer: {
    height: '70%',
  },

  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  password: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
