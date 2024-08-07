import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemeContext from '../context/ThemeContext'
import { Button, Input } from '@rneui/base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import UserContext from '../context/UserContext'
import axiosClient from '../utils/axiosClient'

const DetailsProfile = () => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const { user } = useContext(UserContext)
    const [ localUser, setLocalUser ] = useState({})
    useEffect(() => {
        const newUser = JSON.parse(user)
        setLocalUser(newUser)
    }, [])
    useEffect(() => {
        const getUser = async () => {
            setName(localUser.nombre_completo)
            setEmail(localUser.correo)
        }

        getUser()
    }, [])


    const handleSubmit = async () => {
        try {
            const data = {
                nombre_completo: name,
                correo: email
            }

            await axiosClient.put(`/usuarios/${localUser.id}`, data).then((response) => {
                if (response.status == 200) {
                    ToastAndroid.show("Usuario actualizado correctamente", ToastAndroid.SHORT)
                    navigation.navigate('Profile')
                }
            })
        } catch (error) {
            console.log(error);
        }
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
                    defaultValue={localUser.nombre_completo}
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
                    defaultValue={localUser.correo}
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