import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

const Login = props => {
  return (
    <View style={styles.root}>
      <Button
        testID="login"
        title="Login"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'Home',
            },
          })
        }
      />
    </View>
  );
};

Login.options = {
  topBar: {
    title: {
      text: 'Login',
    },
  },
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
