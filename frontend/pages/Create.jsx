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
import RNPickerSelect from 'react-native-picker-select';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? "#f8f4f1" : '#202020' }}>
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
              dataDetectorTypes={"link"}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text >Tipo (*)</Text>
            <RNPickerSelect
              placeholder={{ label: 'Tipo', value: null }}
              onValueChange={(value) => setSelectedValue(value)}
              items={[
                { label: 'Producción', value: 1 },
                { label: 'Barismo', value: 2 },
                { label: 'Otros', value: 3 },
              ]}
              style={{
                placeholder: { color: theme == 'light' ? 'black' : 'white' },
              }}
            />
          </View>

        </View>
        <View style={{ width: "100%", paddingHorizontal: 16 }}>

          <Button buttonStyle={{ backgroundColor: "#6a4023", borderRadius: 5 }}>
            Subir imagen
          </Button>
        </View>
      </ScrollView>
      <View style={style.interactionButton}>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            borderRadius: 5, backgroundColor: "#6a4023", borderColor: "#6a4023",
            borderWidth: 2
          }}
        >
          Subir
        </Button>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            borderRadius: 5,
            backgroundColor: "transparent",
            borderColor: "#6a4023",
            borderWidth: 2,
          }}
          titleStyle={{ color: theme == 'light' ? "#6a4023" : 'white' }}
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
    borderColor: "#4a4a4a",
    borderWidth: .4,
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
  }
});

export default Create;
