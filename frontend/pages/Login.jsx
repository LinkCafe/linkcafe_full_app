import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { styleConstants } from "../constants/style";
import { Button, Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const navigation = useNavigation()
  const handleVisibilityPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const [password, setPassword ] = useState(null)
  const [email, setEmail ] = useState(null)
  const handleLogin = async () => {
    const emailStorage = await AsyncStorage.getItem('email')
    const passwordStorage = await AsyncStorage.getItem('password')
    if (password == passwordStorage && email == emailStorage) {
      navigation.navigate('HomeTabs')
    } else {
      ToastAndroid.showWithGravity(
        'Error al iniciar sesión',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  return (
    <SafeAreaView style={styleConstants.container}>
      <ScrollView style={style.contentCard}>
          <Text
            style={{
              width: "100%",
              paddingVertical: 15,
              textAlign: "left",
              fontSize: 25,
              fontWeight: 500,
            }}
          >
            Iniciar Sesión
          </Text>
          <Input
            placeholder="Correo"
            inputContainerStyle={style.inputStyle}
            label="Correo"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#E39B5A",
            }}
            leftIconContainerStyle={style.inputContainerStyle}
            textContentType="emailAddress"
            keyboardType="email-address"
            labelStyle={style.labelStyle}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Contraseña"
            inputContainerStyle={style.inputStyle}
            label="Contraseña"
            secureTextEntry={visiblePassword}
            leftIcon={{ type: "font-awesome", name: "lock", color: "#E39B5A" }}
            leftIconContainerStyle={style.inputContainerStyle}
            labelStyle={style.labelStyle}
            rightIcon={{
              type: "font-awesome",
              name: visiblePassword == true ? "eye" : "eye-slash",
              color: "#E39B5A",
              onPress: () => handleVisibilityPassword(),
            }}
            rightIconContainerStyle={style.inputContainerStyle}
            onChangeText={(text) => setPassword(text)}
          />
          <Text
            style={{
              width: "100%",
              textAlign: "right",
              textDecorationLine: "underline",
              color: "blue",
            }}
          >
            ¿Olvidaste la contraseña?
          </Text>
          <View style={style.interaction}>
            <Button buttonStyle={[style.button, style.btnLogin]} onPress={handleLogin}>
              Iniciar Sesión
            </Button>
            <Text style={{ textAlign: "center", color: "gray" }}>o</Text>
            <Button
              buttonStyle={[style.button, style.btnSignUp]}
              titleStyle={{ color: "#E39B5A" }}
              onPress={() => navigation.navigate('SignUp')}
            >
              Registrarse
            </Button>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  contentCard: {
    width: 338,
    height: 540,
    display: "flex",
    flexDirection: "column",
  },
  inputStyle: {
    padding: 2,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainerStyle: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  labelStyle: {
    fontWeight: "normal",
    marginBottom: 10,
  },
  interaction: {
    paddingVertical: 50,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  button: {
    borderRadius: 10,
    padding: 12,
  },
  btnLogin: {
    backgroundColor: "#E39B5A",
  },
  btnSignUp: {
    backgroundColor: "transparent",
    borderColor: "#E39B5A",
    borderWidth: 2,
  },
});

export default Login;
