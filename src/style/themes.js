import {DefaultTheme, DarkTheme} from '@react-navigation/native';

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#009689',
    primaryText: '#009689',
    background: '#fff',
    text: '#333',
    gray: '#777',
    inputBackground: '#fff',
    iconBackground: '#333',
    border: '#ccc',
    track: '#333',
  },
};
export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: '#065951',
    background: '#111',
    inputBackground: '#222',
    iconBackground: '#eee',
    text: '#eee',
    gray: '#777',
    primaryText: '#089b9d',
    border: '#333',
    track: '#ddd',
  },
};
