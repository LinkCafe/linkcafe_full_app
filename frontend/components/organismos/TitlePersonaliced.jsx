import React from 'react';
import {Icon} from '@rneui/base';
import {Text, StyleSheet} from 'react-native';

const TituloPersonalizado = React.memo(({nombreUsuario}) => (
  <React.Fragment>
    <Icon type="font-awesome" name="user" style={styles.iconStyle} />
    <Text style={styles.textStyle}>{nombreUsuario}</Text>
  </React.Fragment>
));

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 80,
    marginLeft: 3,
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 22,
  },
});

export default TituloPersonalizado;
