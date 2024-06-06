import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemeContext from '../context/ThemeContext'
import { Button, Input } from '@rneui/base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const DetailsProfile = () => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        const getUser = async () => {
            setName(await AsyncStorage.getItem('name'))
            setEmail(await AsyncStorage.getItem('email'))
        }

        getUser()
    }, [])

    const handleSubmit = async () => {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('name', name)
        ToastAndroid.showWithGravity(
            'Datos actualizados',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
        navigation.navigate("Profile")
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? 'white' : '#202020' }}>
            <ScrollView style={{ paddingHorizontal: 16 }}>
                <Input
                    placeholder="Nombre de Usuario"
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
                    defaultValue={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Correo Eléctronico"
                    inputContainerStyle={style.inputStyle}
                    leftIconContainerStyle={style.inputContainerStyle}
                    label="Email (*)"
                    labelStyle={{
                        fontWeight: "bold",
                        color: theme == 'light' ? "black" : 'white',
                        marginBottom: 10,
                        fontSize: 15,
                    }}
                    style={{
                        color: theme == 'light' ? 'black' : 'white'
                    }}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    defaultValue={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Button
                    buttonStyle={[style.button, style.btnLogin]}
                    onPress={() => handleSubmit()}
                >
                    Actualizar
                </Button>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
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
        paddingLeft: 10,
        borderColor: "#eeeeee",
        borderWidth: 1,
        borderRadius: 5
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
    },
    button: {
        borderRadius: 10,
        padding: 12,
    },
    btnLogin: {
        backgroundColor: "#E39B5A",
    },
});

export default DetailsProfile