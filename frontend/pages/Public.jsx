import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import public1Image from '../assets/public1.png';

const PublicationView = ({ route }) => {
    const { publication } = route.params;

    const description = "Las fases de la luna han sido consideradas como parte de las actividades agrícolas del cultivo de café, por su marcada influencia en cada una de las etapas fenológicas de éste cultivo.";

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>
            <View style={styles.userInfo}>
                <Avatar
                    rounded
                    size={40}
                    source={{
                        uri: 'https://media.istockphoto.com/id/1407271745/es/foto/fondo-gris.webp?b=1&s=170667a&w=0&k=20&c=XkgRUsO0yohl7GW6x4jq2eUqO7LW8kadgEX2gfuvUT4=',
                    }}
                />
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>Fernando</Text>
                    <Text style={styles.subtitle}>Subido hace 20 min</Text>
                </View>
            </View>
            <Text style={styles.description}>{description}</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
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
        marginTop: 5
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
});

export default PublicationView;
