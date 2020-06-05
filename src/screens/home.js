import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, ActivityIndicator, Surface, Headline} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import functions from '@react-native-firebase/functions';
import {AppContext} from '../index';

const EmotionButton = ({emotion, ...props}) => {
  const {setBusy} = useContext(AppContext);
  return (
    <Button
      style={styles.emotionButton}
      labelStyle={{fontSize: 80}}
      onPress={() => {
        setBusy(true);
        functions()
          .httpsCallable('sendEmotion')({emotion: emotion})
          .finally(() => setBusy(false))
          .then(response => {
            console.log(response);
          });
      }}
      {...props}>
      {emotion}
    </Button>
  );
};

const HomeScreen = ({route}) => {
  const {user} = route.params;
  if (!user || !user.email) {
    return null;
  }
  return (
    <View style={styles.root}>
      <Surface style={styles.pannel}>
        <Headline>How do you feel today?</Headline>
        <View style={styles.emotionButtonContainer}>
          <EmotionButton emotion="😀" />
          <EmotionButton emotion="☹️" />
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  pannelHeader: {
    width: '100%',
  },
  emotionButton: {
    margin: 20,
  },
  emotionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pannel: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
