import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/base";
import ThemeContext from "../context/ThemeContext";
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import UserContext from "../context/UserContext";
import axiosClient from "../utils/axiosClient";

const Create = () => {
  const { theme } = useContext(ThemeContext)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fuentes, setFuentes] = useState('')
  const [selectType, setSelectType] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState(null);
  const navigation = useNavigation()
  const [selectImage, setSelectImage] = useState(null)
  const { user } = useContext(UserContext)
  const [originalUser, setOriginalUser] = useState(null)
  const [uploadImage, setUploadImage] = useState(null)
  useEffect(() => {
    setOriginalUser(JSON.parse(user))
  }, [])

  const handleSubmit = async () => {
    try {
      if (nombre == '' || descripcion == '' || fuentes == '' || selectType == null || selectLanguage == null, selectImage == null) {
        alert("Todos los campos son obligatorios")
        return
      }

      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('descripcion', descripcion)
      formData.append('fuentes', fuentes)
      formData.append('tipo', selectType)
      formData.append('idioma', selectLanguage)
      formData.append('id_usuario', originalUser.id)
      formData.append('imagen', {
        uri: uploadImage.uri,
        type: uploadImage.type,
        name: uploadImage.fileName,
      })

      await axiosClient.post('/publicaciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        if (response.status == 200) {
          alert("Publicación creada correctamente")
          navigation.navigate('Home')
          setNombre('')
          setDescripcion('')
          setFuentes('')
          setSelectType(null)
          setSelectLanguage(null)
          setSelectImage(null)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectImage = async () => {
    try {

      launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setSelectImage(response.assets[0].uri)
          // setUploadImage(response.assets[0])
          const source = { uri: response.assets[0].uri, fileName: response.assets[0].fileName, type: response.assets[0].type };
          setUploadImage(source)
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? "#f8f4f1" : '#202020' }}>
      <ScrollView>
        <View
          style={{ width: "100%", paddingHorizontal: 16, marginBottom: 25 }}
        >
          <View>
            <Input
              placeholder="Encabezado de la publicación"
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
              onChangeText={setNombre}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: theme == 'light' ? 'black' : 'white' }} >Tipo (*)</Text>
            <RNPickerSelect
              placeholder={{ label: 'Tipo', value: null }}
              onValueChange={(value) => setSelectType(value)}
              items={[
                { label: 'Producción', value: 1 },
                { label: 'Barismo', value: 2 },
                { label: 'Otros', value: 3 },
              ]}
              style={{
                placeholder: { color: theme == 'light' ? 'black' : 'white' },
                inputAndroid: { color: theme == 'light' ? 'black' : 'white' },
              }}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: theme == 'light' ? 'black' : 'white' }} >Idioma (*)</Text>
            <RNPickerSelect
              placeholder={{ label: 'Idioma', value: null }}
              onValueChange={(value) => setSelectLanguage(value)}
              items={[
                { label: 'Español', value: 1 },
                { label: 'English', value: 2 },
              ]}
              style={{
                placeholder: { color: theme == 'light' ? 'black' : 'white' },
                inputAndroid: { color: theme == 'light' ? 'black' : 'white' },

              }}
              darkTheme={theme != 'light'}
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
              numberOfLines={3}
              textContentType="URL"
              style={{
                color: theme == 'light' ? 'black' : 'white'
              }}
              onChangeText={setDescripcion}
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
              onChangeText={setFuentes}
            />
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: selectImage != null ? selectImage : null }} width={300} height={100} />
          <Button  titleStyle={{ color: theme == 'light' ? 'white' : '#6a4023' }} buttonStyle={{ backgroundColor:  theme === 'light' ? '#6a4023' : '#e8dcd1', borderRadius: 5 }} onPress={() => handleSelectImage()}>
            Subir imagen
          </Button>
        </View>
      </ScrollView>
      <View style={style.interactionButton}>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            borderRadius: 5, backgroundColor:  theme === 'light' ? '#6a4023' : '#e8dcd1', borderColor:  theme === 'light' ? '#6a4023' : '#e8dcd1',
            borderWidth: 2
          }}
          titleStyle={{ color: theme == 'light' ? 'white' : '#6a4023' }}
          onPress={() => handleSubmit()}
        >
          Subir
        </Button>
        <Button
          containerStyle={{ width: "50%" }}
          buttonStyle={{
            borderRadius: 5,
            backgroundColor: "transparent",
            borderColor:  theme === 'light' ? '#6a4023' : '#e8dcd1',
            borderWidth: 2,
          }}
          titleStyle={{ color: theme == 'light' ? "#6a4023" : 'white' }}
          onPress={() => navigation.navigate("Home")}
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
    paddingLeft: 5,
    borderColor: "#4a4a4a",
    borderWidth: .4,
    borderRadius: 5,
    fontSize: 10,
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
