import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from 'react-native-elements';

const TabBarIcon = ({ iconName, theme }) => {
  switch (iconName) {
    case 'home':
      return <FontAwesomeIcon icon={faHouse} size={20} style={{ color: theme === 'light' ? '#6a4023' : '#e8dcd1' }} />;
    case 'plus':
      return <FontAwesomeIcon icon={faPlus} size={20} style={{ color: theme === 'light' ? '#6a4023' : '#e8dcd1' }} />;
    case 'user':
      return <FontAwesomeIcon icon={faUser} size={20} style={{ color: theme === 'light' ? '#6a4023' : '#e8dcd1' }} />;
    default:
      return null;
  }
};


export default TabBarIcon;
