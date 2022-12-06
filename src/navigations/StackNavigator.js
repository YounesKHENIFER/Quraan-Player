import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ReciterScreen from '../screens/ReciterScreen';

import fonts from '../style/fonts';
import {MyLightTheme, MyDarkTheme} from '../style/themes';
import useToggleTheme from '../style/useToggleTheme';
import OfflineScreen from '../components/OfflineScreen';

const Stack = createStackNavigator();

const StackNavigator = ({connected, setRefresh}) => {
  const {isDark} = useToggleTheme();
  const colors = isDark ? MyDarkTheme.colors : MyLightTheme.colors;

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: fonts.bold,
          color: '#fff',
        },
        headerTintColor: '#fff',
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="Home">
      <Stack.Screen
        options={{
          title: 'قارئ القرآن',
        }}
        name="Home">
        {connected
          ? props => <HomeScreen {...props} />
          : props => <OfflineScreen {...props} setRefresh={setRefresh} />}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerBackVisible: true,
        }}
        name="Reciter">
        {connected
          ? props => <ReciterScreen {...props} />
          : props => <OfflineScreen {...props} setRefresh={setRefresh} />}
      </Stack.Screen>
      <Stack.Screen
        name="Player"
        options={{
          headerBackVisible: true,
          title: '',
        }}
        component={PlayerScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
