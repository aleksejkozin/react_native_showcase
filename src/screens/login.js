import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

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

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.root}>
      <Button
        icon="facebook"
        mode="contained"
        onPress={() => {
          setLoading(true);
          onFacebookButtonPress().finally(() => setLoading(false));
        }}>
        log in with facebook
      </Button>
      {loading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={true} size="large" color="white" />
        </View>
      )}
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
