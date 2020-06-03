/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import {name as appName} from '../app.json';
import {Navigation} from 'react-native-navigation';

Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Login', () => Login);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a',
    },
    topBar: {
      background: {
        color: 'whitesmoke',
      },
    },
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
            },
          },
        ],
      },
    },
  });
});
