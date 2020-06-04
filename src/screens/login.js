import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const Login = ({navigation}) => {
  const loginWithFacebook = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.root}>
      <Button icon="facebook" mode="contained" onPress={loginWithFacebook}>
        log in with facebook
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
