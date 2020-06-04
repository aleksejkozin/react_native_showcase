import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({route}) => {
  const {user} = route.params;
  if (!user || !user.email) {
    return null
  }
  return (
    <View style={styles.root}>
      <Text>Welcome {user.email}</Text>
      <Button
        mode="contained"
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }>
        log out
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

export default HomeScreen;
