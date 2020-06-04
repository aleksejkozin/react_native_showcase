import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Login = props => {
  return (
    <View style={styles.root}>
      <Button testID="login" title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
