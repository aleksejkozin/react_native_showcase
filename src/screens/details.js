import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';

export const DetailsScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackIcon = evaProps => <Icon {...evaProps} name="arrow-back" />;

  const SettingsIcon = evaProps => <Icon {...evaProps} name="settings" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const SettingsAction = () => <TopNavigationAction icon={SettingsIcon} />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        accessoryLeft={BackAction}
        accessoryRight={SettingsAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
