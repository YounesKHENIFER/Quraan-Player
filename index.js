import {AppRegistry} from 'react-native';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
