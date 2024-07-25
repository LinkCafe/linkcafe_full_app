import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginHome from './pages/LoginHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomeTabs from './pages/HomeTabs.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './context/ThemeContext';
import DetailsProfile from './pages/DetailsProfile';
import CategoriesPages from './pages/CategoriesPages';
import PublicationView from './pages/Public';
import { Chat } from './pages/Cha.jsx';
import TituloPersonalizado from './components/organismos/TitlePersonaliced.jsx';

import AllActicles from './pages/AllArticles.jsx';
import Profile from './pages/Profile.jsx';
import { UserProvider } from './context/UserContext.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='black' />
      <UserProvider>
        <ThemeProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginHome"
              component={LoginHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: '',
              }}
            />
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{
                title: '',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DetailsProfile"
              component={DetailsProfile}
              options={{
                title: 'Editar Usuario',
              }}
            />

            <Stack.Screen
              name="CategoriesFull"
              component={CategoriesPages}
              options={{
                title: 'Temas de conversación',
              }}
            />
            <Stack.Screen
              name="chat"
              component={Chat}
              options={{
                headerTitle: () => <TituloPersonalizado nombreUsuario="jose" />,
              }}
            />
            <Stack.Screen
              name="Public"
              component={PublicationView}
            />
            <Stack.Screen
              name="All_articles"
              component={AllActicles}
              options={{ title: 'Articulos' }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: 'Perfil Personal' }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
