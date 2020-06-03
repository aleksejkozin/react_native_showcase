
import React from 'react';
import {AppRegistry, View} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './components/navigation';

import {name as appName} from '../app.json';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </View>
  );
};

AppRegistry.registerComponent(appName, () => App);
