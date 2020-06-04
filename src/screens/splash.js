import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View style={styles.root}>
      <Headline>Welcome to Showcase</Headline>
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

export default SplashScreen;
