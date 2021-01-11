
import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Header from './Header';

export default function Dicas() {

  useEffect(() => {

  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <Header />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
  },
  
});
