import React, {useState, useEffect} from 'react';
import {AppRegistry, View, Button} from 'react-native';

import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SplashScreen from './screens/splash';

import {name as appName} from '../app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DefaultTheme,
  Provider as PaperProvider,
  ActivityIndicator,
} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: 'tomato',
  //   accent: 'yellow',
  // },
};

const BusyOverlay = () => (
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
);

export const AppContext = React.createContext({});

const Stack = createStackNavigator();

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setInitializing(false);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <AppContext.Provider value={{setBusy: setBusy}}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {authorized ? (
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{
                  user: user && {email: user.email, uid: user.uid},
                }}
                options={{
                  title: 'Showcase',
                  headerRight: () => (
                    <Button
                      onPress={() => auth().signOut()}
                      title="Logout"
                    />
                  ),
                }}
              />
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Sign in',
                  animationTypeForReplace: 'pop',
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        {busy && <BusyOverlay />}
      </PaperProvider>
    </AppContext.Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
