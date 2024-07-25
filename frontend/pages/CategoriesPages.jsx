import { ScrollView, StyleSheet, View, Image, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeContext from '../context/ThemeContext';
import { Card } from '@rneui/base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const getCardStyle = theme => ({
  ...styles.card,
  backgroundColor: theme === 'light' ? 'white' : '#464646',
});

const CategoriesPages = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { publicaciones } = route.params;
  const navigation = useNavigation();

  const dynamicSafeAreaViewStyle = {
    ...styles.safeAreaView,
    backgroundColor: theme === 'light' ? 'white' : '#202020',
  };

  const getDomain = (url) => {
    const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
    return match ? match[1] : '';
  }

  return (
    <SafeAreaView style={dynamicSafeAreaViewStyle}>
      <ScrollView>
        {publicaciones.map((d, index) => (
          <TouchableOpacity key={index} onPress={() => { navigation.navigate('Public', {
            id: d.id
          }) }}>
            <Card
              containerStyle={[
                styles.card,
                { backgroundColor: theme == "light" ? "white" : "#434343" },
              ]}
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

              <Text style={{ paddingTop: 10, fontWeight: '600', fontSize: 20, color: theme == "light" ? "black" : "white" }}>
                {d.nombre}
              </Text>
              <Text style={{ paddingTop: 10, color: theme == "light" ? "black" : "white" }}>
                {d.descripcion.slice(0, 100)} ...
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "col",
                  gap: 2,
                  paddingTop: 10,
                }}
              >
                <Text style={{ textDecorationLine: "underline", color: "#35d4f0" }}>
                  {getDomain(d.fuentes)}
                </Text>
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
              </View>
            </Card>
          </TouchableOpacity>

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
