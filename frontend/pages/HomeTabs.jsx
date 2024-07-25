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
import { TouchableOpacity, Image } from 'react-native';
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
      backgroundColor: theme === 'light' ? 'white' : '#202020',
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
            backgroundColor: theme === 'light' ? 'white' : '#202020',
          },
          title: "Inicio",
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerLeft: () => (
            <Image source={theme === 'light' ? require('../img/logo_completo_cafe.png') : require('../img/logo_completo_piel.png')} resizeMode='contain' style={{ display: 'flex', width: 110 }} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesomeIcon icon={faUser} size={23} style={{
                color: theme === 'light' ? '#6a4023' : '#e8dcd1',
                marginRight: 24 
              }} />
            </TouchableOpacity>
          ),
          tabBarIcon: () => <TabBarIcon iconName="home" theme={theme} />,
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
            color: theme === 'light' ? 'black' : 'white',
          },
          tabBarIcon: () => <TabBarIcon iconName="plus" theme={theme} />,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme === 'light' ? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light' ? 'white' : '#202020',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          headerTitle: 'Perfil personal',
          tabBarIcon: () => <TabBarIcon iconName="user" theme={theme} />,
          tabBarStyle: { paddingBottom: 5, height: 60, backgroundColor: theme === 'light' ? 'white' : '#202020' },
          tabBarLabelStyle: { fontSize: 15 },
          headerStyle: {
            backgroundColor: theme === 'light' ? 'white' : '#202020',
          },
          headerTitleStyle: {
            color: theme === 'light' ? 'black' : 'white',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
