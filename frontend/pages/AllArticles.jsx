import React, { useEffect, useState, useContext } from 'react';
import { Text, SafeAreaView, ScrollView, Alert, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Card } from "@rneui/base";
import axiosClient from '../utils/axiosClient';
import ThemeContext from '../context/ThemeContext';

const AllArticles = () => {
  const [articulos, setArticulos] = useState([]);
  const { theme } = useContext(ThemeContext);

  const getArticulos = async () => {
    try {
      const response = await axiosClient.get('/articulos');
      if (response && response.status === 200) {
        setArticulos(response.data);
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

  const getDomain = (url) => {
    const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
    return match ? match[1] : '';
  };


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.containerCard}>
          {articulos.map((d, index) => (
            <TouchableOpacity style={{ width: '100%' }} onPress={() => Linking.openURL(d.enlace)} key={index}>
              <Card
                key={index}
                containerStyle={[
                  styles.card,
                  { backgroundColor: theme == "light" ? "white" : "#434343" },
                ]}
              >
                <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: '600', color: theme == "light" ? "black" : "white" }}>
                  {d.nombre}
                </Text>
                <Text>{d.descripcion}</Text>
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
                    {getDomain(d.enlace)}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>

          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  texto: {
    marginTop: 20,
    fontSize: 26,
    color: 'black',
  },
  containerCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    margin: 0,
    borderColor: '#a1a1a1',
    borderWidth: 0.3,
  },
});

export default AllArticles;
