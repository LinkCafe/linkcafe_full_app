import { View, Text, StyleSheet, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { styleConstants } from '../constants/style';
import { Button, Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../utils/axiosClient';


const SignUp = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleVisibilityPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handleSignUp = async () => {
    const data = {
      nombre: name,
      correo: email,
      clave: password
    }
    
    try {
      if (!name || !email || !password) {
        ToastAndroid.showWithGravity(
          'Campos incompletos',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        return;
      } else {
        const response = await axiosClient.post("/register", data)
        if (response.status == 200) {
          navigation.navigate('Login');
          ToastAndroid.showWithGravity(
            'Registro completado',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        'Error al registrarse',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }

    
  };

  return (
    <SafeAreaView style={[styleConstants.container, { backgroundColor: 'white' }]}>
      <ScrollView style={style.contentCard}>
        <Text style={[style.titleStyle, { color: 'black' }]}>Registro</Text>

        <View>
          <Input
            placeholder="Nombre"
            inputContainerStyle={style.inputStyle}
            label="Nombre"
            leftIcon={() => <FontAwesomeIcon icon={faUser} size={20} style={{ color: '#6a4023' }} />}
            leftIconContainerStyle={style.inputContainerStyle}
            textContentType="name"
            labelStyle={style.labelStyle}
            onChangeText={text => setName(text)}
          />

        </View>
        <View>
          <Input
            placeholder="Correo"
            inputContainerStyle={style.inputStyle}
            label="Correo"
            leftIcon={() => <FontAwesomeIcon icon={faEnvelope} size={20} style={{ color: '#6a4023' }} />}
            leftIconContainerStyle={style.inputContainerStyle}
            textContentType="emailAddress"
            keyboardType="email-address"
            labelStyle={style.labelStyle}
            onChangeText={text => setEmail(text)}
          />

        </View>

        <View>
          <Input
            placeholder="Contraseña"
            inputContainerStyle={style.inputStyle}
            label="Contraseña"
            secureTextEntry={visiblePassword}
            leftIcon={() => <FontAwesomeIcon icon={faLock} size={20} style={{ color: '#6a4023'}} />}
            leftIconContainerStyle={style.inputContainerStyle}
            labelStyle={style.labelStyle}
            rightIcon={() => <TouchableOpacity onPress={() => handleVisibilityPassword()}><Text><FontAwesomeIcon icon={visiblePassword ? faEye : faEyeSlash} size={20} style={style.icon}  /></Text></TouchableOpacity> }
            rightIconContainerStyle={style.inputContainerStyle}
            onChangeText={text => setPassword(text)}
          />
          
        </View>


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
    color: 'black',
    fontWeight: "500",
  },
  inputStyle: {
    padding: 2,
    borderColor: '#6a4023',
    borderWidth: .2,
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
    color: '#6a4023',
  },
  btnLogin: {
    backgroundColor: '#E39B5A',
  },
  btnSignUp: {
    backgroundColor: 'transparent',
    borderColor: '#6a4023',
    borderWidth: 2,
  },
  icon: {
    position: 'absolute',
    color: '#6a4023',
  }
});
