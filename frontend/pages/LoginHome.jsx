import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { Button } from '@rneui/base';
import {styleConstants} from '../constants/style';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginHome = () => {
  const navigation = useNavigation();
  const handleGuest = async () => {
    try {
      await AsyncStorage.setItem('name', 'Invitado');
      await AsyncStorage.setItem('email', 'invitado@gmail.com');
      await AsyncStorage.setItem('password', 'invitado');
      console.log("Datos de invitado guardados");
      navigation.navigate('HomeTabs');
      ToastAndroid.showWithGravity(
        'Sesión como invitado',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      console.error("Error al iniciar sesión como invitado:", error);
    }
  };
  
  return (
    <SafeAreaView style={styleConstants.container}>
      <ScrollView style={style.contentCard}>
        <Image
          source={require('../img/loginImage.jpg')}
          style={style.fullWidthImage}
          resizeMode="contain"
        />
        <Text style={style.lemaText}>
          {' '}
          <Text style={style.boldText}>LinkCafé:</Text> interactúa con{' '}
          <Text style={style.expertosText}>expertos</Text>, descubre más sobre
          el café y adquiere conocimiento veraz. ✌
        </Text>
        <View style={style.interaccion}>
          <Button
            buttonStyle={[style.button, style.btnLogin]}
            onPress={() => navigation.navigate('Login')}>
            Iniciar Sesión
          </Button>
          <Button
            buttonStyle={[style.button, style.btnSignUp]}
            titleStyle={style.btnSignUpTitleStyle}
            onPress={() => navigation.navigate('SignUp')}>
            Registrarse
          </Button>
          <Text style={style.guestText} onPress={() => handleGuest()}>
            Iniciar como invitado
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  contentCard: {
    width: 338,
    height: 540,
    display: 'flex',
    flexDirection: 'column',
  },
  fullWidthImage: {
    width: '100%',
    
  },
  boldText: {
    color: '#6a4023',
    fontWeight: 'bold',
  },
  guestText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color:'black',
    paddingBottom:'12',
  },
  expertosText: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color:'black',
  },
  lemaText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color:'black',
  },
  interaccion: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  button: {
    borderRadius: 10,
    padding: 12,
  },
  btnSignUpTitleStyle: {
    color: '#6a4023',
  },
  btnLogin: {
    backgroundColor: '#6a4023',
  },
  btnSignUp: {
    backgroundColor: 'transparent',
    borderColor: '#6a4023',
    borderWidth: 2,
  },
});

export default LoginHome;
