import {
  View,
  Text,
  StyleSheet
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Avatar } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import axiosClient from "../../utils/axiosClient";

const Categories = () => {

  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation()
  const [publicaciones, setPublicaciones] = useState([])

  const getPublicaciones = async () => {
    try {
      const response = await axiosClient.get('/publicaciones');
      if (response && response.status === 200) {
        setPublicaciones(response.data);
      } else {
        Alert.alert('No se encontraron publicaciones');
      }
    } catch (error) {
      Alert.alert('Error al obtener las Publicaciones', error.message);
    }
  }

  useEffect(() => {
    getPublicaciones();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.moreCategories}>
        <Text style={[style.moreCategoriesText, { color: theme == 'light' ? 'black' : 'white' }]}>Temas de conversación</Text>
        <Button
          type="outline"
          title="Ver todo >"
          buttonStyle={{ padding: 1, borderColor: theme == 'light' ? 'black' : '#a1a1a1', borderWidth: .7, backgroundColor: theme == 'light' ? 'white' : 'transparent' }}
          titleStyle={{ color: theme == 'light' ? 'black' : 'white' }}
          onPress={() => navigation.navigate("CategoriesFull", {
            publicaciones
          })}
        />
      </View>
      <View style={style.categoriesContainer}>
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : '#202020' }]} onPress={() => navigation.navigate("CategoriesFull", {
          publicaciones: publicaciones.filter((p) => p.tipo == "Producción" )
        })}>
          <Avatar
            size={40}
            rounded
            title="🌱"
            titleStyle={style.styleButton.icon}
            containerStyle={{ backgroundColor: "#e9e9e9" }}
          />
          <Text style={[style.styleButton.text, { color: theme == 'light' ? 'black' : 'white' }]}>Producción</Text>
        </Button>
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : '#202020' }]} onPress={() => navigation.navigate("CategoriesFull", {
          publicaciones: publicaciones.filter((p) => p.tipo == "Barismo" )
        })} >
          <Avatar
            size={40}
            rounded
            title="☕"
            titleStyle={style.styleButton.icon}
            containerStyle={{ backgroundColor: "#e9e9e9" }}
          />
          <Text style={[style.styleButton.text, { color: theme == 'light' ? 'black' : 'white' }]}>Barismo</Text>
        </Button>
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : '#202020' }]} onPress={() => navigation.navigate("CategoriesFull", {
          publicaciones: publicaciones.filter((p) => p.tipo == "Otros" )
        })}>
          <Avatar
            size={40}
            rounded
            title="📖"
            titleStyle={style.styleButton.icon}
            containerStyle={{ backgroundColor: "#e9e9e9" }}
          />
          <Text style={[style.styleButton.text, { color: theme == 'light' ? 'black' : 'white' }]}>Entre Otros</Text>
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  moreCategories: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  moreCategoriesText: {
    fontSize: 18,
    fontWeight: "600",
  },
  categoriesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  styleButton: {
    width: 110,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
    borderColor: "#a1a1a1",
    borderWidth: .7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    text: {
      fontSize: 15,
      marginTop: 5,
    },
    icon: {
      fontSize: 20
    },
  },
});

export default Categories;
