import {ScrollView, StyleSheet, View, Image, Text} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeContext from '../context/ThemeContext';
import {Card} from '@rneui/base';

const getCardStyle = theme => ({
  ...styles.card,
  backgroundColor: theme === 'light' ? 'white' : '#464646',
});

const CategoriesPages = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const {publicaciones} = route.params;

  
  const dynamicSafeAreaViewStyle = {
    ...styles.safeAreaView,
    backgroundColor: theme === 'light' ? 'white' : '#202020',
  };

  return (
    <SafeAreaView style={dynamicSafeAreaViewStyle}>
      <ScrollView>
        {publicaciones.map((d, index) => (
          <Card
          key={index}
          containerStyle={[
            styles.card,
            { backgroundColor: theme == "light" ? "white" : "#434343" },
          ]}
        >
          <Image
                src={`http://10.0.2.2:3333/public/img/${d.imagen}`}
                style={{ width: "100%", height: 150 }}
          />
          <Text style={{ paddingTop: 10, textAlign: 'center', fontSize: 20,  color: theme == "light" ? "black" : "white" }}>
            {d.nombre}
          </Text>
          <Text style={{ paddingTop: 10, color: theme == "light"? "black" : "white" }}>
            {d.descripcion}
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
              {d.fuentes}
            </Text>
          </View>
        </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'left',
  },
  titleCard: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CategoriesPages;
