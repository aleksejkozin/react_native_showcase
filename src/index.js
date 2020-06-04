import React from 'react';
import {AppRegistry} from 'react-native';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import {name as appName} from '../app.json';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

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
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
