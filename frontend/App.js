import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginHome from './pages/LoginHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomeTabs from './pages/HomeTabls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './context/ThemeContext';
import DetailsProfile from './pages/DetailsProfile';
import CategoriesPages from './pages/CategoriesPages';
import {Chat} from './pages/Cha.jsx'
import { Icon } from '@rneui/base';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  React.useEffect( () => {
    const handleDataAdmin = async () => {
      const dataAdmin = {
        nombre: "admin",
        email: "admin@gmail.com",
        password: "admin",
        rol: 1
      }
      const existingData = await AsyncStorage.getItem('dataAdmin');
      if (!existingData) {
        await AsyncStorage.setItem('dataAdmin', JSON.stringify(dataAdmin));
      }
    }
    handleDataAdmin();
  }, [])

  return (
    <NavigationContainer>
      <StatusBar />
      <ThemeProvider>
        <Stack.Navigator>
          <Stack.Screen name="LoginHome" component={LoginHome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{
            title: ''
          }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{
            title: ''
          }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
            title: '',
            headerShown: false
          }} />
          <Stack.Screen name='DetailsProfile' component={DetailsProfile} options={{
            title: 'Editar Usuario'
          }} />
          <Stack.Screen name='CategoriesFull' component={CategoriesPages} options={{
            title: 'Temas de conversación',
          }} />
         <Stack.Screen
            name="chat"
            component={Chat}
            options={{
              headerTitle: () => (
                <React.Fragment>
                  <Icon type="font-awesome" name="user" style={{ fontSize: 80, marginLeft:3 }} />
                  <Text style={{ marginLeft: 10, fontSize:22 }}>jose</Text>

                </React.Fragment>
              )
            }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}