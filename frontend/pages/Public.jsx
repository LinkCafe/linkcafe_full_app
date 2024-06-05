import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import ThemeContext  from '../context/ThemeContext';

const public1Image = require('../img/public1.png');

const PublicationView = ({ route }) => {
    const { publication } = route.params;
    const { theme } = useContext(ThemeContext);

    const description = "Las fases de la luna han sido consideradas como parte de las actividades agrícolas del cultivo de café, por su marcada influencia en cada una de las etapas fenológicas de éste cultivo.";

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: theme === 'dark'? '#121212' : '#ffffff' }}>
            <View style={styles.header}></View>
            <View style={styles.userInfo}>
                <Avatar
                    rounded
                    size={40}
                />
                <View style={styles.userDetails}>
                    <Text style={[styles.userName, { color: theme === 'dark'? 'white' : 'black' }]}>Fernando</Text>
                    <Text style={styles.subtitle}>Hace 20 min</Text>
                </View>
            </View>
            <Text style={[styles.description, { color: theme === 'dark'? 'white' : 'black' }]}>{description}</Text>
            <Image
                source={public1Image}
                style={styles.image}
            />
            <View style={styles.urlContainer}>
                <Text style={styles.urlLabel}>URL:</Text>
                <Text style={styles.url}>https://diplomado2007unas.blogspot.com/2007/09/el-cultivo-del-caf-y-las-fases-de-la.html</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Veridica</Text>
                <Text style={styles.infoText2}>Producción 🌱</Text>
            </View>
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Agregar un comentario..."
                    placeholderTextColor={'#95A5A6'}
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Icon name="paper-plane" size={20} color="#E39B5A" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
    },
    userDetails: {
        flexDirection: 'column',
        marginLeft: 20, 
        marginTop: 5,
    },
    description: {
        marginBottom: 18,
        fontSize: 14,
        lineHeight: 24,
        paddingLeft: 22,
        paddingRight: 22,
        marginTop: 5,
    },
    image: {
        width: Dimensions.get('window').width - 36,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 16,
    },
    urlContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderColor: '#D5DBDB',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    urlLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    url: {
        fontSize: 12,
        color: '#3498DB',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D5DBDB',
        borderWidth: 1, 
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 7, 
        paddingVertical: 4,
        marginRight: 5,
        backgroundColor: '#D4EFDF', 
        borderColor: '#D5DBDB', 
        borderWidth: 1,
        borderRadius: 5,
    },
    infoText2: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 7, 
        paddingVertical: 4, 
        backgroundColor: '#E5E7E9', 
        borderColor: '#D5DBDB', 
        borderWidth: 1,
        borderRadius: 5,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 50,
    },
    commentInput: {
        flex: 1,
        height: 48,
        paddingLeft: 20,
        paddingRight: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D5DBDB',
        borderRadius: 10,
        padding: 15
    },
    sendButton: {
        position: 'absolute',
        right: 25,
        top: 18,
    },    
});

export default PublicationView;