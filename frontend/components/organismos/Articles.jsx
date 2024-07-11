import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Button } from "@rneui/base";
import ThemeContext from "../../context/ThemeContext";
import axiosClient from '../../utils/axiosClient';
import { useNavigation } from '@react-navigation/native';

const Articles = () => {
  const [articulos, setArticulos] = useState([]);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const getArticulos = async () => {
    try {
      const response = await axiosClient.get('/articulos');
      if (response && response.status === 200) {
        const allArticles = response.data;
        const lastThreeArticles = allArticles.slice(-3);
        setArticulos(lastThreeArticles);
      } else {
        Alert.alert('No se encontraron artículos');
      }
    } catch (error) {
      Alert.alert('Error al obtener los artículos', error.message);
    }
  };

  useEffect(() => {
    getArticulos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.moreCategories}>
        <Text
          style={[
            styles.moreCategoriesText,
            { color: theme == "light" ? "black" : "white" },
          ]}
        >
          Artículos recomendados
        </Text>
        <Button
          type="outline"
          title="Ver todo >"
          buttonStyle={{ padding: 1, borderColor: theme == 'light' ? 'black' : '#a1a1a1', borderWidth: .7, backgroundColor: theme == 'light' ? 'white' : 'transparent'}}
          titleStyle={{ color: theme == 'light' ? 'black' : 'white' }}
          onPress={() => navigation.navigate("All_articles", {
            type: 'all'
          })}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.containerCard}>
          {articulos.map((d, index) => (
            <Card
              key={index}
              containerStyle={[
                styles.card,
                { backgroundColor: theme == "light" ? "white" : "#434343" },
              ]}
            >
              <Text style={{ paddingTop: 12, color: theme == "light" ? "black" : "white" }}>
                {d.nombre}
              </Text>
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
                    backgroundColor: theme == "light" ? "#3e3e3e26" : "gray",
                    color: theme == "light" ? "black" : "white",
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
                <Text style={{ textDecorationLine: "underline", color: "#35d4f0" }}>
                  Más información
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  all_articles:{
    borderWidth:1,
    borderRadius:5,
    width:100,
  },
  text:{
    paddingRight:3,
    paddingLeft:12,
  }
});

export default Articles;
