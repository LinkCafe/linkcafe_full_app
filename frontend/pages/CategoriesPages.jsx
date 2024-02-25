import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { publications } from '../constants/publications';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeContext from '../context/ThemeContext';
import { Button, Card } from '@rneui/base';

const CategoriesPages = ({ route }) => {
    const { theme } = useContext(ThemeContext)
    const { type } = route.params;

    const filteredPublications = publications.filter((publication) => {
        if (type === "all") {
            return true;
        } else {
            return publication.type === type;
        }
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme == 'light' ? 'white' : '#202020', paddingHorizontal: 16 }}>
            <ScrollView>
                {filteredPublications.map((publication) => (
                    <Card containerStyle={[style.card, { backgroundColor: theme == 'light' ? 'white' : '#464646' }]}>
                        <Text key={publication.title} style={[style.titleCard, { color: theme == 'light' ? 'black': 'white'}]}>{publication.title}</Text>
                        <Text key={publication.description} style={{ color: theme == 'light' ? 'gray' : '#D1D1D1' }}>{publication.description}</Text>
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>

    );
}

const style = StyleSheet.create({
    card: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        borderRadius: 5,
        textAlign: 'left'
    },
    titleCard: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default CategoriesPages