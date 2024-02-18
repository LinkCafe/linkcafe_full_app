import { Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import Home from "./Home";
import { Icon } from "@rneui/base";
import Create from "./Create";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../context/ThemeContext";

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)
  const optionsBase = {
    headerTitle: "",
    tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme == 'light' ? 'white' : '#202020' },
    tabBarLabelStyle: { fontSize: 15 },
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: theme === 'light' ? 'white' : '#202020'
          },
          title: "Inicio",
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerLeft: () => (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: theme === 'light' ? 'black' : 'white' }}>Link Café</Text>
          ),
          headerRight: () => (
            <Icon
              type="font-awesome"
              name="user"
              style={{
                marginRight: 20,
                width: 40,
                height: 40,
                backgroundColor: theme == 'light' ? "#e9e9e9" : '#3d3d3d',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
              }}
              iconStyle={{ color: theme == 'light' ? "#5c3d21" : 'white'}}
              onPress={() => navigation.navigate("Profile")}
            />
          ),
          tabBarIcon: () => <Icon style={{ fontSize: 20 }} color={theme == 'light' ? "#5c3d21" : 'white'} type="font-awesome" name="home"/>,
          ...optionsBase,
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          title: 'Crear',
          headerTitle: 'Crear publicación',
          headerTitleStyle: {
            color: theme == 'light' ? 'black' : 'white'
          },
          tabBarIcon: () => <Icon style={{ fontSize: 20 }} color={theme == 'light' ? "#5c3d21" : 'white'} type="font-awesome" name="plus"/>,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme == 'light' ? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light' ? 'white' : '#202020'
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ 
          title: 'Perfil',
          headerTitle: 'Perfil personal',
          tabBarIcon: () => <Icon style={{ fontSize: 20 }} color={theme == 'light' ? "#5c3d21" : 'white'}  type="font-awesome" name="user"/>,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme == 'light' ? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light' ? 'white' : '#202020'
          },
          headerTitleStyle: {
            color: theme == 'light' ? 'black' : 'white'
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
