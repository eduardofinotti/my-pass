import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Switch, Platform, TextInput, Keyboard } from 'react-native';
import Storage from '@react-native-community/async-storage';

import Header from './Header';
import Clipboard from 'expo-clipboard';
import FlashMessage, { showMessage } from "react-native-flash-message";

import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

var logo = require('./assets/mp-logo.png');
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {

  const [ password, setPassword] = useState('')
  const [ lengthPassword, setLengthPassword] = useState('8')
  
  const [ upper, setUper] = useState(true)
  const [ down, setDown] = useState(true)
  const [ numbers, setNumbers] = useState(true)
  const [ specials, setSpecials] = useState(true)
  
  const [ admob, setAdmob] = useState('')
  const [ admob2, setAdmob2] = useState('')
  const [ publiTime, setPubliTime] = useState(0)

  async function showInterstitial() {
    if(Platform.OS == 'ios'){
      AdMobInterstitial.setAdUnitID('ca-app-pub-7656347766469977/2300153686'); // Test ID, Replace with your-admob-unit-id
    } else {
      AdMobInterstitial.setAdUnitID('ca-app-pub-7656347766469977/3433271952'); // Test ID, Replace with your-admob-unit-id
    }
    
    try{
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    // setTestDeviceIDAsync('EMULATOR');

    if(Platform.OS == 'ios'){
      setAdmob('ca-app-pub-7656347766469977/6721780271')
      setAdmob2('ca-app-pub-7656347766469977/5941684091')
    } else {
      setAdmob('ca-app-pub-7656347766469977/9866818366')
      setAdmob2('ca-app-pub-7656347766469977/4437030733')
    }
  }, [])

  function copyToClipboard() {
    Clipboard.setString(password);

    showMessage({
      message: "senha copiada!",
      type: "success",
      floating: true,
      style: {backgroundColor: '#999999'}
      });
  }

  async function favoritePassword() {

    let existingProducts = await Storage.getItem('@passwords')

    let newProduct = JSON.parse(existingProducts);
   
    if( !newProduct ){
      newProduct = []
    }

    newProduct.push( {item: password} )

    await Storage.setItem('@passwords', JSON.stringify(newProduct) )
      .then( ()=>{
        console.log(`It was saved successfully`)
      } )
      .catch( ()=>{
        console.log(`There was an error saving the product`)
      } )

  }

  async function generatePassword() {

    if(!upper && !down && !numbers && !specials){
      alert('escolha pelo menos uma opção para gerar a senha.')
    }

    setPassword('')

    var char = ''

    for (let index = 0; index < lengthPassword; index++) {
      if(upper && char.length < lengthPassword){
        char = char + getChar(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
      }
      
      if(down && char.length < lengthPassword){
        char = char + getChar(1, 'abcdefghijklmnopqrstuvwxyz')
      }

      if(numbers && char.length < lengthPassword){
        char = char + getChar(1, '0123456789')
      }
      
      if(specials && char.length < lengthPassword){
        char = char + getChar(1, `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`)
      }
    }

    var char = char.split('').sort(function(){return 0.5-Math.random()}).join('');

    setPubliTime(publiTime + 1)

    if(publiTime%4 == 0){
      showInterstitial()
    }

    setPassword(char)  
  }

  function getChar(length, chars) {
    var result           = '';
    var characters       = chars;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <SafeAreaView style={styles.container}>

      <FlashMessage position="top" />

      <Header />

      <View style={styles.passwordContainer}>
        <Text style={password == '' ? styles.generateInfo : styles.password}>
            {password == '' ? 'gere uma senha...': password}
        </Text>
        <TouchableOpacity style={styles.generateButton} onPress={generatePassword}>
          <Text style={styles.generateButtonText}>gerar senha</Text> 
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.copyContent} onPress={copyToClipboard}>
            <MaterialCommunityIcons name="content-copy" color={'#a1a1a1'} size={20} />
            <Text style={styles.copy}>copiar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.copyContent} onPress={favoritePassword}>
            <MaterialCommunityIcons name="star" color={'#a1a1a1'} size={20} />
            <Text style={styles.copy}>favoritar</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20}}>
        <AdMobBanner
          bannerSize="banner"
          adUnitID={admob} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds
        />
      </View>

      <View style={styles.configContainer}>
        <View style={styles.config}>
          <Text style={styles.labelConfig}>tamanho</Text>
          <TextInput 
            keyboardType = 'name-phone-pad' 
            style={{backgroundColor: 'black', width: 50, borderRadius: 5, fontSize: 16, 
            paddingVertical: 5, paddingHorizontal: 5, color: '#fff'}}
            onChangeText={(x) => {
              setLengthPassword(String(x))
            }}
            onBlur={Keyboard.dismiss()}
            value={lengthPassword}
            KeyboardAvoidingView={true}
          />
        </View>

        <View style={styles.config}>
          <Text style={styles.labelConfig}>maiúscula</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#000" }}
            ios_backgroundColor="#9999"
            onValueChange={(value) => setUper(!upper)}
            value={upper}
          />
        </View>

        <View style={styles.config}>
          <Text style={styles.labelConfig}>minúscula</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#000" }}
            ios_backgroundColor="#9999"
            onValueChange={(value) => setDown(!down)}
            value={down}
          />
        </View>

        <View style={styles.config}>
          <Text style={styles.labelConfig}>números</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#000" }}
            ios_backgroundColor="#9999"
            onValueChange={(value) => setNumbers(!numbers)}
            value={numbers}
          />
        </View>

        <View style={styles.config}>
          <Text style={styles.labelConfig}>símbolos</Text>
          <Switch
            trackColor={{ false: "#fff", true: "#000" }}
            ios_backgroundColor="#9999"
            onValueChange={(value) => setSpecials(!specials)}
            value={specials}
          />
        </View>
            
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>
        <AdMobBanner
          bannerSize="banner"
          adUnitID={admob2} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS == 'ios' ? '5%' : '10%',
    height: '17%'
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

  passwordContainer: {
    height: '20%',
    alignItems: 'center',
    paddingVertical: 20
  },

  generateInfo: {
    color: '#a1a1a1',
    marginVertical: 10
  },

  password: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20
  },

  generateButton: {
    backgroundColor: 'black',
    padding: 13,
    borderRadius: 5,
    marginVertical: 10
  },

  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  copyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  copyLogo: {
    marginRight: 5,
    width: 20,
    height: 20,
  },

  copy: {
    color: '#a1a1a1'
  },  

  configContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  config: {
    marginVertical: 10,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  labelConfig: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
  
});
