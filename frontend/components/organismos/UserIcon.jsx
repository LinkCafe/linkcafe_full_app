import React from 'react';
import {StyleSheet} from 'react-native';
import { Icon } from '@rneui/base';

const UserIcon = ({theme, navigation}) => {
  return (
    <Icon
      style={styles.icon}
      color={theme === 'light' ? '#5c3d21' : 'white'}
      type="font-awesome"
      name="user"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default UserIcon;
