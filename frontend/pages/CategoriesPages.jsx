import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {publications} from '../constants/publications';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeContext from '../context/ThemeContext';
import {Card} from '@rneui/base';

const getCardStyle = theme => ({
  ...style.card,
  backgroundColor: theme === 'light' ? '#E8DCD1' : '#464646',
});

const CategoriesPages = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const {type} = route.params;

  const filteredPublications = publications.filter(publication => {
    if (type === 'all') {
      return true;
    } else {
      return publication.type === type;
    }
  });

  
  const dynamicSafeAreaViewStyle = {
    ...style.safeAreaView,
    backgroundColor: theme === 'light' ? '#E8DCD1' : '#202020',
  };

  return (
    <SafeAreaView style={dynamicSafeAreaViewStyle}>
      <ScrollView>
        {filteredPublications.map(() => (
          <Card containerStyle={getCardStyle(theme)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'left',
  },
  titleCard: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CategoriesPages;
