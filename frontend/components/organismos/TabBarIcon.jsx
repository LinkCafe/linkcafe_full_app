import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faHouse, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const TabBarIcon = ({ iconName }) => {
  switch (iconName) {
    case 'home':
      return <FontAwesomeIcon icon={faHouse} size={23} style={styles.icon} />;
    case 'plus':
      return <FontAwesomeIcon icon={faPlus} size={23} style={styles.icon} />;
    case 'user':
      return <FontAwesomeIcon icon={faUser} size={23} style={styles.icon} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  icon: {
    color: '#E39B5A'
  },
});

export default TabBarIcon;
