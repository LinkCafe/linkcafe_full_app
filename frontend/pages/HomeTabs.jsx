import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Create from './Create';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext.jsx';
import TabBarIcon from '../components/organismos/TabBarIcon.jsx';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const optionsBase = {
    headerTitle: '',
    tabBarStyle: {
      paddingBottom: 5,
      height: 60,
      backgroundColor: theme === 'light'? 'white' : '#202020',
    },
    tabBarLabelStyle: { fontSize: 15 },
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: theme === 'light'? 'white' : '#202020',
          },
          title: "Inicio",
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerLeft: () => (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: theme === 'light'? 'black' : 'white' }}>Link Café</Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesomeIcon icon={faUser} size={23} style={style.iconcolor} />
            </TouchableOpacity>
          ),
          tabBarIcon: () => <TabBarIcon iconName="home" />,
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
            color: theme === 'light'? 'black' : 'white',
          },
          tabBarIcon: () => <TabBarIcon iconName="plus" />,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme === 'light'? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light'? 'white' : '#202020',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          headerTitle: 'Perfil personal',
          tabBarIcon: () => <TabBarIcon iconName="user" />,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme === 'light'? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light'? 'white' : '#202020',
          },
          headerTitleStyle: {
            color: theme === 'light'? 'black' : 'white',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;

const style = StyleSheet.create({
  iconcolor: {
    color: '#E39B5A',
    marginRight: 24,
  },
});
