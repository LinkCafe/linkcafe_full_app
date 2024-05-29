import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {styleConstants} from '../constants/style';
import {Button, Input} from '@rneui/base';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleVisibilityPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      ToastAndroid.showWithGravity(
        'Campos incompletos',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    } else {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      ToastAndroid.showWithGravity(
        'Registro completado',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styleConstants.container}>
      <ScrollView style={style.contentCard}>
        <Text style={style.titleStyle}>Registro</Text>
        <Input
          placeholder="Nombre"
          inputContainerStyle={style.inputStyle}
          label="Nombre"
          leftIcon={{
            type: 'font-awesome',
            name: 'user',
            color: '#E39B5A',
          }}
          leftIconContainerStyle={style.inputContainerStyle}
          textContentType="emailAddress"
          labelStyle={style.labelStyle}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder="Correo"
          inputContainerStyle={style.inputStyle}
          label="Correo"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: '#E39B5A',
          }}
          leftIconContainerStyle={style.inputContainerStyle}
          textContentType="emailAddress"
          labelStyle={style.labelStyle}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Contraseña"
          inputContainerStyle={style.inputStyle}
          label="Contraseña"
          secureTextEntry={visiblePassword}
          leftIcon={{type: 'font-awesome', name: 'lock', color: '#E39B5A'}}
          leftIconContainerStyle={style.inputContainerStyle}
          labelStyle={style.labelStyle}
          rightIcon={{
            type: 'font-awesome',
            name: visiblePassword === true ? 'eye' : 'eye-slash',
            color: '#E39B5A',
            onPress: () => handleVisibilityPassword(),
          }}
          rightIconContainerStyle={style.inputContainerStyle}
          onChangeText={text => setPassword(text)}
        />
        <View style={style.interaction}>
          <Button
            buttonStyle={[style.button, style.btnSignUp]}
            titleStyle={style.buttonTitleStyle}
            onPress={() => handleSignUp()}>
            Registrarse
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const style = StyleSheet.create({
  contentCard: {
    width: 338,
    height: 540,
    display: 'flex',
    flexDirection: 'column',
  },
  titleStyle: {
    width: '100%',
    paddingVertical: 15,
    textAlign: 'left',
    fontSize: 25,
    color:'black',
    fontWeight: "500",
  },
  inputStyle: {
    padding: 2,
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerStyle: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  labelStyle: {
    fontWeight: 'normal',
    marginBottom: 10,
  },
  interaction: {
    paddingVertical: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  button: {
    borderRadius: 10,
    padding: 12,
  },
  buttonTitleStyle: {
    color: '#E39B5A',
  },
  btnLogin: {
    backgroundColor: '#E39B5A',
  },
  btnSignUp: {
    backgroundColor: 'transparent',
    borderColor: '#E39B5A',
    borderWidth: 2,
  },
});
