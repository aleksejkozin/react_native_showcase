import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const Login = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('Home')}>
        Press me
      </Button>
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
