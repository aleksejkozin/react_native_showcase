import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {AppContext} from '../app';

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

const LoginScreen = ({navigation}) => {
  const {setBusy} = useContext(AppContext);

  return (
    <View style={styles.root}>
      <Button
        icon="facebook"
        mode="contained"
        onPress={() => {
          setBusy(true);
          onFacebookButtonPress().finally(() => setBusy(false));
        }}>
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

export default LoginScreen;
