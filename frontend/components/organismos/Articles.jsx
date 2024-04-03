import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card } from "@rneui/base";
import { Button } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";

const Articles = () => {
  const data = [
    {
      imagen:
        "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=600",
      titulo: "Prácticas avanzadas para la producción de café ",
      categoria: "PDF",
    },
    {
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6U0IIzs_1vCo98DWEMa81gAhQNlI-13986A&usqp=CAU",
      titulo: "El café sube un 10,2% su precio actual ",
      categoria: "Noticia",
    }
  ];

  const { theme } = useContext(ThemeContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.moreCategories}>
        <Text style={[style.moreCategoriesText, { color: theme == 'light' ? 'black' : 'white' }]}>Artículos recomendados</Text>
        <Button
          type="outline"
          title="Ver todos >"
          buttonStyle={{ padding: 1, borderColor: theme == 'light' ? 'black' : 'white', borderWidth: 1 }}
          titleStyle={{ color: theme == 'light' ? 'black' : 'white' }}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={style.containerCard}>
          {data.map((d, index) => (
            <Card key={index} containerStyle={[style.card, { backgroundColor: theme == 'light' ? 'white' : '#434343' }]}>
              <Image
                source={{
                  uri: d.imagen,
                  width: "100%",
                  height: 150,
                }}
              />
              <Text style={{ paddingTop: 12, color: theme == 'light' ? 'black' : 'white' }}>{d.titulo}</Text>
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
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: theme == 'light' ? "#3e3e3e26" : 'gray',
                    color: theme == 'light' ? 'black' : 'white'
                  }}
                >
                  {d.categoria}
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
                <Text style={{ textDecorationLine: 'underline', color: '#35d4f0' }}>Mas información</Text>
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

export default Articles;
