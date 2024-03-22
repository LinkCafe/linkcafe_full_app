import React from "react";
import { ScrollView, Text, StyleSheet, View, TextInput, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

export const Chat = ({ navigation }) => {
   return (
      <SafeAreaView style={style.SafeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={style.container}>
              
              <Text style={style.text1}>hola</Text>
              <Text style={style.text2}>como esta</Text>
              <Text style={style.text3}>bien</Text>
              <Text style={style.text4}>que hace</Text>
              <Text style={style.text5}>trabajar</Text>
              <Text style={style.text6}>me puede hacer un favor</Text>
              <Text style={style.text7}>cual ?</Text>
              <Text style={style.text8}>me ayuda con esto. la tarea</Text>
              <Text style={style.text9}>mmm si claro</Text>
              <Text style={style.text10}>yo puedo el lunes</Text>
              <Text style={style.text11}>me ayuda con esto</Text>
            </View>
          </ScrollView>
          <View style={style.inputContainer}>
            <TextInput placeholder="Escriba un mensaje" style={style.input}></TextInput>
            <Icon type="font-awesome" name="arrow-right" size={34}style={{ paddingLeft:3, co:'orange' }} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
   );
};

const style = StyleSheet.create({
 SafeAreaView: {
    backgroundColor: "white",
    flex: 1,
 },
 container: {
    flex: 1,
    padding: 20,
    position:'relative',
    bottom:'auto'
 },
 inputContainer: {
   padding: 10,
   borderTopWidth: 1,
   borderTopColor: '#ddd',
   display:'flex',
   flexDirection:'row',
},
input:{
     borderWidth:1,
     padding:3,
     borderColor:'orange',
     width:263,
     height:36,
     borderRadius:32,
     paddingLeft:25,
},
 text1: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "orange",
    marginBottom: 10,
    textAlign:'center',
    width:87,
    height:43,
    padding:13,
    borderRadius:12
 },
 text2: {
    backgroundColor: "orange",
    borderWidth: 1,
    borderColor: "orange",
    marginBottom: 10,
    width:127,
    textAlign:'center',
    position:'absolute',
    right:9,
    top:59,
    height:43,
    padding:13,
    borderRadius:12
 },
 text3: {
   backgroundColor: "white",
   borderWidth: 1,
   borderColor: "orange",
   marginTop: 30,
   textAlign:'center',
   width:87,
   height:43,
   paddingTop:13,
   borderRadius:12
 },
 text4: {
   backgroundColor: "orange",
   borderWidth: 1,
   borderColor: "orange",
   marginTop: 30,
   textAlign:'center',
   width:87,
   height:43,
   paddingTop:13,
   borderRadius:12,
   marginLeft:243
 },
 text5:{
   backgroundColor: "white",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:87,
   height:43,
   paddingTop:13,
   borderRadius:12 
 },
 text6:{
   backgroundColor: "orange",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:107,
   height:53,
   paddingTop:13,
   borderRadius:12,
   marginLeft:233 
 },
 text7:{
   backgroundColor: "white",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:87,
   height:43,
   paddingTop:13,
   borderRadius:12 
 },
 text8:{
   backgroundColor: "orange",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:127,
   height:48,
   padding:13,
   borderRadius:12, 
   marginLeft:213
 }, 
 text9:{
   backgroundColor: "white",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:87,
   height:48,
   paddingTop:13,
   padding:12,
   borderRadius:12, 
 },
 text10:{
   backgroundColor: "orange",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:127,
   height:48,
   padding:13,
   borderRadius:12, 
   marginLeft:213
 },
 text11:{
   backgroundColor: "white",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:87,
   height:48,
   paddingTop:13,
   borderRadius:12,    
 },

 text12:{
   backgroundColor: "orange",
   borderWidth: 1,
   borderColor: "orange",
   marginBottom: 10,
   textAlign:'center',
   width:87,
   height:48,
   paddingTop:13,
   borderRadius:12, 
   marginLeft:243
 }
});


