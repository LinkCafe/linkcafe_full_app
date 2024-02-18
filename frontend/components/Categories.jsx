import {
  View,
  Text,
  StyleSheet
} from "react-native";
import React, { useContext } from "react";
import { Button, Avatar } from "@rneui/base";
import ThemeContext from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation()
  return (
    <View style={style.container}>
      <View style={style.moreCategories}>
        <Text style={[style.moreCategoriesText, { color: theme == 'light' ? 'black' : 'white' }]}>Temas de conversación</Text>
        <Button
          type="outline"
          title="Ver todo >"
          buttonStyle={{ padding: 1, borderColor: theme == 'light' ? 'black' : 'white', borderWidth: 1 }}
          titleStyle={{ color: theme == 'light' ? 'black' : 'white' }}
          onPress={() => navigation.navigate("CategoriesFull", {
            type: 'all'
          })}
        />
      </View>
      <View style={style.categoriesContainer}>
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : 'transparent' }]} onPress={() => navigation.navigate("CategoriesFull", {
          type: 'produccion'
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
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : 'transparent' }]} onPress={() => navigation.navigate("CategoriesFull", {
          type: 'barismo'
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
        <Button buttonStyle={[style.styleButton, { backgroundColor: theme == 'light' ? "#fafafa" : 'transparent' }]} onPress={() => navigation.navigate("CategoriesFull", {
          type: 'otros'
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
    borderColor: "#797979",
    borderWidth: 1,
    borderRadius: 7,
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
