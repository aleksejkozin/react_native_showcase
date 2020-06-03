import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.root}>
      <Text>Welcome to React</Text>
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

Home.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
};

export default Home;
