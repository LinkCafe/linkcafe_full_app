import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid, Keyboard, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';
import axiosClient from '../utils/axiosClient';
import { useKeyboard } from '@react-native-community/hooks';
import UserContext from '../context/UserContext';

const PublicationView = ({ route, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { id } = route.params;
    const { user } = useContext(UserContext)
    const [publicacion, setPublicacion] = useState({});
    const [comentarios, setComentarios] = useState([]);
    const [newComment, setNewComment] = useState('');
    const keyboard = useKeyboard();

    const getData = async () => {
        try {
            await axiosClient.get(`/publicaciones/listar/${id}`).then((response) => {
                if (response.status === 200) {
                    if (response.data.fecha) {
                        const date = new Date(response.data.fecha);
                        const options = { day: 'numeric', month: 'long' };
                        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
                        response.data.fecha = formattedDate;
                    }
                    setPublicacion(response.data);
                    navigation.setOptions({ headerTitle: response.data.nombre });
                }
            });

            await axiosClient.get(`/comentarios/publicacion/${id}`).then((response) => {
                if (response.status === 200) {
                    setComentarios(response.data.comentarios);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    const formatDate = (originalDate) => {
        const date = new Date(originalDate);
        const options = { day: 'numeric', month: 'long' };
        const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
        return formattedDate;
    }

    const dynamicSafeAreaViewStyle = {
        ...styles.safeAreaView,
        backgroundColor: theme === 'light' ? 'white' : '#202020',
    };

    const getDomain = (url) => {
        const match = url.match(/^https?:\/\/(?:www\.)?([^\/]+)/i);
        return match ? match[1] : '';
    };

    const handleCommentSubmit = async () => {
        try {
            id_usuario = JSON.parse(user).id;
            const data = {
                comentario: newComment,
                id_usuario: parseInt(id_usuario),
                id_publicacion: parseInt(id),
            };

            if (newComment === '') {
                ToastAndroid.showWithGravity("El comentario no puede estar vacío", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                return;
            }

            await axiosClient.post("/comentarios", data).then((response) => {
                if (response.status === 200) {
                    getData()
                    setNewComment('')
                    ToastAndroid.showWithGravity("Comentario creado con éxito", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    Keyboard.dismiss()
                }
            })

        } catch (error) {
            console.error(error);
        }
    };

    if (Object.keys(publicacion).length === 0) {
        return (
            <SafeAreaView style={dynamicSafeAreaViewStyle}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height }}>
                    <Text>Cargando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={dynamicSafeAreaViewStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: theme == 'light' ? 'black' : 'white', fontWeight: '500', fontSize: 18 }}>
                                <FontAwesomeIcon icon={faUser} style={{ color: theme == 'light' ? 'black' : 'white' }} /> {' '}
                                {publicacion.nombre_usuario}
                            </Text>
                            <Text style={{ color: 'gray' }} >{publicacion.fecha}</Text>
                        </View>
                        <Text style={{ color: theme == 'light' ? 'black' : 'white', fontSize: 15 }}>{publicacion.descripcion}</Text>
                        {publicacion.imagen != null ? (
                            <Image
                                src={`http://10.0.2.2:3333/public/img/${publicacion.imagen}`}
                                style={{ width: "100%", height: 150 }}
                            />
                        ) : (
                            <View style={{ width: '100%', height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: theme === 'light' ? 'black' : 'white' }}>Sin Imagen</Text>
                            </View>
                        )}
                        <Text style={{ color: 'gray' }} onPress={() => Linking.openURL(publicacion.fuentes)}>{getDomain(publicacion.fuentes)}</Text>
                        <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", paddingTop: 10 }}>
                            <Text style={{
                                backgroundColor: publicacion.estado === 'Verídica' ? "#75DF77" : publicacion.estado === 'En proceso' ? "#c9c306" : '#FF7070',
                                padding: 3,
                                borderRadius: 2,
                                color: 'white'
                            }}>
                                {publicacion.estado}
                            </Text>
                            <Text style={{
                                padding: 3,
                                borderRadius: 2,
                                backgroundColor: theme === 'light' ? "#3e3e3e26" : 'gray',
                                color: theme === 'light' ? 'black' : 'white'
                            }}>
                                {publicacion.tipo}
                            </Text>
                        </View>
                        <Text style={{ paddingTop: 10, fontWeight: '500', fontSize: 15, color: theme == 'light' ? 'black' : 'white' }}>Comentarios</Text>
                        {comentarios.length > 0 ? comentarios.map((comentario, index) => (
                            <View key={index} style={{ width: '100%', borderColor: theme == 'light' ? 'black' : 'gray', borderWidth: .2, padding: 5, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 5, justifyContent: 'space-between', marginBottom: 2 }}>
                                <View style={{ width: '5%', paddingLeft: 2 }}>
                                    <FontAwesomeIcon icon={faUser} style={{ color: theme == 'light' ? 'black' : 'white' }} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ fontWeight: '500', color: theme == 'light' ? 'black' : 'white' }}>{comentario.nombre_usuario}</Text>
                                    <Text style={{ color: theme == 'light' ? 'black' : 'white' }}>{comentario.comentario}</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text style={{ color: 'gray' }}>{formatDate(comentario.fecha)}</Text>
                                </View>
                            </View>
                        )) : (
                            <Text style={{ textAlign: 'center', padding: 10, color: 'gray' }}>No hay comentarios</Text>
                        )}
                    </View>
                </ScrollView>
                <View style={[styles.inputContainer, {
                    marginBottom: keyboard.keyboardShown
                        ? 100 : 0,
                    backgroundColor: theme === 'light' ? 'white' : '#202020',
                }]}>
                    <TextInput
                        style={[styles.input, { color: theme === 'light' ? 'black' : 'white' }]}
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Escribe un comentario"
                        placeholderTextColor={theme === 'light' ? 'black' : 'white'}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PublicationView;
