import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import MushafScreen from '../screens/MushafScreen';
import SurasScreen from '../screens/SurasScreen';

import fonts from '../style/fonts';
import {useTheme} from '@react-navigation/native';

const Stack = createStackNavigator();

const MushafStack = () => {
  const {colors} = useTheme();
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
          title: 'المصحف',
        }}
        name="Home"
        component={SurasScreen}
      />
      <Stack.Screen
        options={{
          headerBackVisible: true,
          title: 'سورة',
        }}
        name="Mushaf"
        component={MushafScreen}
      />
    </Stack.Navigator>
  );
};

export default MushafStack;
