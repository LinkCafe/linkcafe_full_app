import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';


const AllArticles = () => {
const [articles , setArticles]= useState([]);
const [error, setError]= useState([]);
  const listar_articulos = async()=>{
    try {
      const response = await axios.get('http://192.168.0.103:3333/articulos');
      setArticles(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }
  useEffect(()=>{
    listar_articulos();
  }, [])  
  return (
    <SafeAreaView style={style.safe}>
      <ScrollView>
        <Text style={style.texto}>Articulos publicados</Text>
        {articles.map((article) => {
 return(
<View key={article.id} style={style.post}>
<Text style={style.name_data}>Nombre del Autor:</Text>
      <Text style={style.date}>{article.autor}</Text>
      <Text style={style.name_data}>Enlace del Articulo:</Text>
      <Text style={style.date}>{article.enlace}</Text>
      <Text style={style.name_data}>Fecha De Articulo:</Text>
      <Text style={style.date}>{article.fecha}</Text>
      <Text style={style.name_data}>Enlace DeL Articulo:</Text>
      <TouchableHighlight onPress={() => Linking.openURL(article.enlace)}>
        <Text style={[style.date, { textDecorationLine: 'underline', color: 'blue' }]}>
          {article.enlace}
        </Text>
      </TouchableHighlight>
      <Text style={style.name_data}>Nombre Del Articulo:</Text>
      <Text style={style.date}>{article.nombre}</Text>
      <Text style={style.name_data}>Tipo de Articulo:</Text>
      <Text style={style.date}>{article.tipo}</Text>
 </View>
 );
})}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
    safe:{
        flex:1,
        alignItems:"center",
    },
    texto:{
        marginTop:126,
        fontSize:26,
        color:'black'
    },
    text_post:{
      color:'black',
      fontSize:17
    },
    name_data: {
      fontSize: 16,
      color: 'black',
    },
    date: {
      fontSize: 16,
      color: 'black',
    },
    post:{
      paddingLeft:6,
      paddingRight:6,
      borderWidth:2,
      borderColor:'black',
      borderRadius:12,
      width:'34px'
    }
})


export default AllArticles;