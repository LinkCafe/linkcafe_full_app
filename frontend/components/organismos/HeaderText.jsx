import React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: theme => ({
    color: theme === 'dark' ? 'white' : 'black',
    fontSize: 20,
  }),
});

const HeaderText = ({theme}) => (
  <Text style={styles.text(theme)}>Link Café</Text>
);

export default HeaderText;
