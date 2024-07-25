import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import axiosClient from "../../utils/axiosClient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";

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
            <TouchableOpacity onPress={() => {
              navigation.navigate('Public', {
                id: d.id
              }
              )
            }}
            >
              <Card
                key={index}
                containerStyle={[style.card, { backgroundColor: theme == 'light' ? 'white' : '#464646' }]}
              >
                {
                  d.imagen != null ? (
                    <Image
                      src={`http://10.193.129.240:3333/public/img/${d.imagen}`}
                      style={{ width: "100%", height: 150 }}
                    />
                  ) : (
                    <View style={{ width: '100%', height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: theme == 'light' ? 'black' : 'white' }}>Sin Imagen</Text>
                    </View>
                  )
                }

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
                        d.estado == 'Verídica' ? "#75DF77" : d.estado == 'En proceso' ? "#c9c306" : '#FF7070',
                      padding: 3,
                      borderRadius: 2,
                      color: 'white'
                    }}
                  >
                    {d.estado}
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      borderRadius: 2,
                      backgroundColor: theme == 'light' ? "#3e3e3e26" : 'gray',
                      color: theme == 'light' ? 'black' : 'white'
                    }}
                  >
                    {d.tipo}
                  </Text>
                </View>
                <Text style={{ paddingTop: 5, color: theme == 'light' ? 'black' : 'white', fontWeight: '500', fontSize: 14 }}>{d.nombre.slice(0, 50)} ...</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    paddingTop: 5,
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ color: theme == 'light' ? '#202020' : 'white' }} />
                  <Text style={{ color: theme == 'light' ? '#202020' : 'white' }}>{d.nombre_usuario}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} style={{ color: theme == 'light' ? '#202020' : 'white' }} />
                  <Text style={{ color: theme == 'light' ? 'black' : 'white' }}>{d.idioma}</Text>
                </View>
              </Card>
            </TouchableOpacity>

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
