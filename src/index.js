import React, {useState, useEffect} from 'react';
import {AppRegistry} from 'react-native';

import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SplashScreen from './screens/splash';

import {name as appName} from '../app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import auth from '@react-native-firebase/auth';

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: 'tomato',
  //   accent: 'yellow',
  // },
};

const Stack = createStackNavigator();

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {authorized ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{user: user && {email: user.email}}}
              options={{
                title: 'Showcase',
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
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
