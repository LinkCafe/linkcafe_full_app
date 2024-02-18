import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/base";
import ThemeContext from "../context/ThemeContext";


const Create = () => {
  const categories = ["Producción", "Barismo", "Otros"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const { theme } = useContext(ThemeContext)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? "white" : '#202020' }}>
      <ScrollView>
        <View
          style={{ width: "100%", paddingHorizontal: 16, marginBottom: 25 }}
        >
          <View>
            <Input
              placeholder="Nombre o encabezado de la publicación"
              inputContainerStyle={style.inputStyle}
              leftIconContainerStyle={style.inputContainerStyle}
              label="Nombre (*)"
              labelStyle={{
                fontWeight: "bold",
                color: theme == 'light' ? "black" : 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              style={{ 
                color: theme == 'light' ? 'black' : 'white'
              }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ fontSize: 16, marginBottom: 10, fontWeight: "bold", color: theme == 'light' ?  'black' : 'white'}}
            >
              Tipo de publicación (*)
            </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    style.categoryButton,
                    selectedCategory === category &&
                      style.selectedCategoryButton,
                    {
                      backgroundColor: theme == 'light' ? "#eee" : 'gray',
                    }
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text style={[style.categoryButtonText, { color: theme == 'light' ? "#333" : 'white'}]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10, color: theme == 'light' ?  'black' : 'white' }}>
            Detalles de la publicación
          </Text>
          <View>
            <Input
              placeholder="URLs origen de la información"
              inputContainerStyle={style.inputStyle}
              leftIconContainerStyle={style.inputContainerStyle}
              label="Fuentes"
              labelStyle={{
                fontWeight: "bold",
                color: theme == 'light' ? "black" : 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              style={{ 
                color: theme == 'light' ? 'black' : 'white'
              }}
            />
          </View>
          <View>
            <Input
              placeholder="Descripción de la publicación"
              inputContainerStyle={style.inputStyle}
              leftIconContainerStyle={style.inputContainerStyle}
              label="Descripción (*)"
              labelStyle={{
                fontWeight: "bold",
                color: theme == 'light' ? "black" : 'white',
                marginBottom: 10,
                fontSize: 15,
              }}
              multiline={true}
              numberOfLines={4}
              textContentType="URL"
              style={{ 
                color: theme == 'light' ? 'black' : 'white'
              }}
            />
          </View>
          <Button buttonStyle={{ backgroundColor: "#E39B5A", borderRadius: 5 }}>
            Subir imagen
          </Button>
        </View>
      </ScrollView>
      <View style={style.interactionButton}>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{ borderRadius: 5, backgroundColor: "#E39B5A" }}
        >
          Subir
        </Button>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            borderRadius: 5,
            backgroundColor: "transparent",
            borderColor: "#E39B5A",
            borderWidth: 2,
          }}
          titleStyle={{ color: theme == 'light' ? "#E39B5A" : 'white' }}
        >
          Cancelar
        </Button>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryButton: {
    padding: 7,
    borderRadius: 5,
  },
  selectedCategoryButton: {
    backgroundColor: "#19d10834",
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: "400"
  },
  inputStyle: {
    paddingLeft: 10,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderRadius: 5
  },
  inputContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  interactionButton: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Create;
