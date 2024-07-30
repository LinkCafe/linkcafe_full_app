import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Switch } from "@rneui/base";
import ThemeContext from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import axiosClient from "../utils/axiosClient";


const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)
  const [storageUser, setStorageUser] = useState({})
  const [language, setLanguage] = useState(null)
  const [nameUser, setNameUser] = useState('')
  const navigation = useNavigation()
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  }

  useEffect(() => {
    const newUser = JSON.parse(user)
    setStorageUser(newUser)

    axiosClient.get(`/usuarios/${newUser.id}`).then((response) => {
      if (response.status == 200) {
        setNameUser(response.data[0].nombre_completo);
      }
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? '#f8f4f1' : '#202020' }}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Avatar
              size={40}
              roundedb
              title="🌱"
              containerStyle={style.containerAvatar}
            />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: theme == 'light' ? 'black' : 'white' }}>
                {nameUser}
              </Text>
            </View>
          </View>
          <View>
            <Button
              buttonStyle={{
                backgroundColor: "tranparent",
                borderWidth: 1,
                borderColor: theme == 'light' ? "black" : 'white',
                padding: 1,
                borderRadius: 5,
              }}
              titleStyle={{ color: theme == 'light' ? "black" : 'white' }}
              onPress={() => navigation.navigate("DetailsProfile")}
            >
              Editar {">"}
            </Button>
          </View>
        </View>
        {/* <Reviews /> */}
        <Text style={{ fontSize: 22, fontWeight: '600', color: theme == 'light' ? 'black' : 'white', marginTop: 20 }}>Configuraciones adicionales</Text>
        <View style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10
        }} >
          <Text style={{
            fontSize: 18,
            fontWeight: '500',
            color: theme == 'light' ? 'black' : 'white'
          }} >Tema: {theme == 'light' ? 'Claro' : 'Oscuro'}</Text>
          <Switch
            value={theme === 'light' ? false : true}
            onValueChange={() => handleToggleTheme()}
            color={theme === 'dark' ? 'white' : '#2089dc'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const style = StyleSheet.create({
  containerAvatar: {
    backgroundColor: "#e9e9e9",
    display: "flex",
    justifyContent: "center",
  },
});
