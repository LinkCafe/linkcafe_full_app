import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Switch } from "@rneui/base";
import Reviews from "../components/organismos/Reviews";
import ThemeContext from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Profile =  () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  }
  
  useEffect(() => {
    const getUser = async () => {
      setName(await AsyncStorage.getItem('name'))
      setEmail(await AsyncStorage.getItem('email'))
      setPassword(await AsyncStorage.getItem('password'))
    }

    setInterval(() => getUser(), 500)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? 'white' : '#202020' }}>
      <ScrollView style={{ paddingHorizontal: 16}}>
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
                {name}
              </Text>
              <Text style={{ color: theme == 'light' ? 'black' : 'white' }}>Caficultor</Text>
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
              onPress={() => navigation.navigate("DetailsProfile", {
                name: name,
                email: email,
                password: password
              }) } 
            >
              Editar {">"}
            </Button>
            <Button onPress={()=>navigation.navigate('chat')}>chat</Button>


          </View>
        </View>
        <Reviews />
        <View style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10
        }} >
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme == 'light' ? 'black' : 'white'
          }} >Tema: {theme == 'light' ? 'Claro' : 'Oscuro' }</Text>
          <Switch 
            value={ theme === 'light' ? false : true } 
            onValueChange={() => handleToggleTheme()}
            color={ theme === 'dark' ? 'white' : '#2089dc'}
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
