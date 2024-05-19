import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/base';

const TabBarIcon = ({theme, name}) => {
  return (
    <View>
      <Icon name={name} theme={theme} />
      <Text style={styles.icon}>
        Icon for {name} with theme {theme}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
  },
});

export default TabBarIcon;
