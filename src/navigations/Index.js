import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {MyLightTheme, MyDarkTheme} from '../style/themes';
import useToggleTheme from '../style/useToggleTheme';
import BottomNavigation from './BottomNavigation';
import StackNavigator from './StackNavigator';

const Stack = createStackNavigator();

const Index = () => {
  const {isDark} = useToggleTheme();
  const colors = isDark ? MyDarkTheme.colors : MyLightTheme.colors;

  return (
    <NavigationContainer theme={isDark ? MyDarkTheme : MyLightTheme}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <BottomNavigation />
      {/* <StackNavigator /> */}
    </NavigationContainer>
  );
};

export default Index;
