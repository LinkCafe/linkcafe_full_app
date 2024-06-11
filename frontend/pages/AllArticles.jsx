import React from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';



const AllArticles = () => {

  
    
  return (
    <SafeAreaView style={style.safe}>
        <ScrollView>
      <Text style={style.texto}>Articulos publicados</Text>
    </ScrollView>
    </SafeAreaView>
    
  );
};
const style = StyleSheet.create({
    safe:{
        flex:1,
        alignItems:"center",
        color: "#E8DCD1",
    },
    texto:{
        marginTop:126,
        fontSize:26,
        color:'#6A4023'
    }
})

export default AllArticles;