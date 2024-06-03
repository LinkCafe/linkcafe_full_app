import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/base';
import ThemeContext from '../../context/ThemeContext';

const TabBarIcon = ({ name }) => {
  const { theme } = useContext(ThemeContext);
  const iconColor = theme === 'dark'? 'white' : 'black';
  return (
    <View>
      <Icon name={name} color={iconColor} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default TabBarIcon;
