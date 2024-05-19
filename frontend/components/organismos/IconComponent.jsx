import React from 'react';
import {Icon} from '@rneui/base';
import { StyleSheet } from 'react-native';

const IconComponent = ({theme}) => (
  <Icon
    style={styles.icon}
    color={theme === 'light' ? '#5c3d21' : 'white'}
    type="font-awesome"
    name="plus"
  />
);

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default IconComponent;
