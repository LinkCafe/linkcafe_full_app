import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import axiosClient from "../../utils/axiosClient";

const Discussions = () => {

  const [publicaciones, setPublicaciones] = useState([])
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation();

  const getPublicacion = async () => {
    try {
      const response = await axiosClient.get('/publicaciones');
      if (response && response.status === 200) {
        const allPublicaciones = response.data;
        const lastThreePublicaciones = allPublicaciones.slice(-3)
        setPublicaciones(lastThreePublicaciones);
      } else {
        Alert.alert('No Se Encontraron Publicaciones')
      }
    } catch (error) {
      Alert.alert('Error al obtener los artículos', error.message);
    }
  }

  useEffect(() => {
    getPublicacion();
  }, []);

  const handlePress = (publication) => {
    navigation.navigate('Public', {
      screen: 'Public',
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.moreCategories}>
        <Text style={[style.moreCategoriesText, { color: theme == 'light' ? 'black' : 'white' }]}>Últimas Publicaciones</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={style.containerCard}>
          {publicaciones.map((d, index) => (
            <Card
              key={index}
              containerStyle={[style.card, { backgroundColor: theme == 'light' ? 'white' : '#464646' }]}
            >
              <Image
                src={`http://10.0.2.2:3333/public/img/${d.imagen}`}
                style={{ width: "100%", height: 150 }}
              />
              <Text style={{ paddingTop: 12, color: theme == 'light' ? 'black' : 'white' }}>{d.nombre}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Text
                  style={{
                    backgroundColor:
                      d.veridica == true ? theme == 'light' ? "#D4EFDF" : '#75DF77' : theme == 'light' ? "#E920203e" : '#FF7070',
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  {d.veridica == true ? "Veridica" : "En proceso"}
                </Text>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: theme == 'light' ? "#3e3e3e26" : 'gray',
                    color: theme == 'light' ? 'black' : 'white'
                  }}
                >
                  {d.tipo}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Text style={{ fontWeight: "bold", color: theme == 'light' ? 'black' : 'white' }}>{d.nombre_usuario}</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const style = StyleSheet.create({
  containerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    paddingLeft: 15,
  },
  card: {
    width: 220,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    margin: 0,
    borderColor: '#a1a1a1',
    borderWidth: .3
  },
  moreCategories: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  moreCategoriesText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Discussions;
