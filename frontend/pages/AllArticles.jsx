import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';


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
    },
    texto:{
        marginTop:126,
        fontSize:26
    }
})

export default AllArticles;