import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text as NativeText} from 'react-native';
import {
  Button,
  Surface,
  Headline,
  Title,
  Text,
  Caption,
} from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {AppContext} from '../app';

const EmotionButton = ({emotion, ...props}) => {
  const {setBusy} = useContext(AppContext);
  return (
    <Button
      style={styles.emotionButton}
      labelStyle={{fontSize: 80}}
      onPress={() => {
        setBusy(true);
        firebase
          .app()
          .functions('europe-west3')
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

const MessageBubble = ({emotion, createdAt, isMine}) => {
  return (
    <View style={isMine ? styles.bubbleViewMine : styles.bubbleView}>
      <Surface style={[styles.bubble, isMine ? styles.mine : styles.notMine]}>
        <View style={styles.bubbleTextView}>
          <NativeText style={styles.bubbleText}>{emotion}</NativeText>
          <Text
            style={isMine ? styles.bubbleSubTextMine : styles.bubbleSubText}>
            {createdAt
              .toDate()
              .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
        </View>
      </Surface>
    </View>
  );
};

const EmotionsView = ({user}) => {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    return firestore()
      .collection('emotions')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .onSnapshot(querySnapshot => {
        setEmotions(
          querySnapshot.docs.map(x => ({
            ...x.data(),
            id: x.id,
          })),
        );
      });
  }, []);

  console.log(user);

  return (
    <FlatList
      style={styles.emotionsView}
      data={emotions}
      inverted={true}
      renderItem={({item: {uid, ...props}}) => (
        <MessageBubble isMine={uid == user.uid} {...props} />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const HomeScreen = ({route}) => {
  const {user} = route.params;

  if (!user) {
    return null;
  }

  return (
    <View style={styles.root}>
      <EmotionsView user={user} />
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
  bubbleTextView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bubbleSubTextMine: {
    color: '#8bc34a',
  },
  bubbleSubText: {
    color: '#9e9e9e',
  },
  mine: {
    backgroundColor: '#b2ff59',
  },
  notMine: {
    backgroundColor: '#e0e0e0',
  },
  bubbleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bubbleViewMine: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bubbleText: {
    fontSize: 50,
  },
  bubble: {
    margin: 15,
    padding: 16,
    borderRadius: 32,
    flex: 0.6,
    elevation: 0,
  },
  emotionsView: {
    width: '100%',
  },
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
    marginBottom: 16,
  },
  root: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
