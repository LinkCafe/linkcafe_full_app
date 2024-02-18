import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { Button } from "@rneui/base";
import { styleConstants } from "../constants/style";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginHome = () => {
  const navigation = useNavigation();
  const handleGuest = async () => {
    await AsyncStorage.setItem('name', 'Invitado')
    await AsyncStorage.setItem('email', 'invitado@gmail.com')
    await AsyncStorage.setItem('password', 'invitado')

    navigation.navigate('HomeTabs')
    ToastAndroid.showWithGravity(
      'Sesión como invitado',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  }
  return (
    <SafeAreaView style={styleConstants.container}>
      <ScrollView style={style.contentCard}>
        <Image
          source={require('../assets/loginImage.jpg')}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
        <Text style={style.lemaText}>
          {" "}
          <Text style={{ color: "#E39B5A", fontWeight: "bold" }}>
            LinkCafé:
          </Text>{" "}
          interactúa con{" "}
          <Text style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            expertos
          </Text>
          , descubre más sobre el café y adquiere conocimiento veraz. ✌
        </Text>
        <View style={style.interaccion}>
          <Button
            buttonStyle={[style.button, style.btnLogin]}
            onPress={() => navigation.navigate("Login")}
          >
            Iniciar Sesión
          </Button>
          <Button
            buttonStyle={[style.button, style.btnSignUp]}
            titleStyle={{ color: "#E39B5A" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Registrarse
          </Button>
          <Text
            style={{ textDecorationLine: "underline", textAlign: "center" }}
            onPress={() => handleGuest()}
          >
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
    display: "flex",
    flexDirection: "column",
  },
  lemaText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  interaccion: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
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

export default LoginHome;
