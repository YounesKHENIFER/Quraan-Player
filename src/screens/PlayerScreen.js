import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../style/fonts';
import colors from '../style/colors';

async function setupPlayer(suras, firstItem) {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.Skip,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SeekTo,
        Capability.Skip,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
    });
    await TrackPlayer.add(suras);
    await TrackPlayer.skip(firstItem);
  } catch (error) {
    console.log(error);
  }
}
async function togglePlay(playBackState) {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    if (playBackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
}
export default function PlayerScreen({navigation, route}) {
  const firstrender = useRef(true);
  const progress = useProgress();
  const playBackState = usePlaybackState();
  let {reciterName, suraId, suras, suraName} = route.params;
  const [currentSuraTrack, setCurrentSuraTrack] = useState(null);
  const [repeatMode, setRepeatMode] = useState('off');
  const [isFavorite, setIsFavorite] = useState(false);
  const [suraTitle, setSuraTitle] = useState(suraName);

  const getFavorites = useCallback(async () => {
    try {
      let savedValue = await AsyncStorage.getItem('favorites');
      const value = savedValue != null ? JSON.parse(savedValue) : [];
      if (value.length) {
        const isSaved =
          value.findIndex(
            item =>
              item.id === currentSuraTrack.id &&
              item.name === currentSuraTrack.name &&
              item.reciterName === currentSuraTrack.reciterName &&
              item.url === currentSuraTrack.url &&
              item.rewaya === currentSuraTrack.rewaya,
          ) >= 0;
        if (isSaved) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentSuraTrack]);

  useLayoutEffect(() => {
    const firstIndex = suras.findIndex(sura => sura.id === suraId);
    setupPlayer(suras, firstIndex);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentSuraTrack?.reciterName ?? reciterName,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={colors.gary}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => <View />,
    });
    if (currentSuraTrack) {
      if (firstrender.current) {
        firstrender.current = false;
      } else {
        setSuraTitle(currentSuraTrack.title);
      }
      getFavorites();
    }
  }, [currentSuraTrack]);

  // next && back handler
  const skip = useCallback(async to => {
    let currentTrack = await TrackPlayer.getCurrentTrack();
    if (to === 'prev' && currentTrack > 0) {
      await TrackPlayer.skipToPrevious();
    } else if (to === 'next' && currentTrack < suras.length - 1) {
      await TrackPlayer.skipToNext();
    }
  }, []);

  // change icon based on repeat mode
  const getRepeatIcon = useCallback(() => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    } else if (repeatMode === 'track') {
      return 'repeat-once';
    } else if (repeatMode === 'repeat') {
      return 'repeat';
    }
  }, [repeatMode]);

  // toggle repeat mode handler
  const changeRepeatMode = useCallback(() => {
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    } else if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    } else if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  }, [repeatMode]);

  // add track to favorite
  const toggleFavorite = useCallback(async () => {
    try {
      if (currentSuraTrack) {
        let savedValue = await AsyncStorage.getItem('favorites');
        savedValue = savedValue != null ? JSON.parse(savedValue) : [];
        const isSaved = savedValue.findIndex(
          item =>
            item.id === currentSuraTrack.id &&
            item.title === currentSuraTrack.title &&
            item.reciterName === currentSuraTrack.reciterName &&
            item.url === currentSuraTrack.url &&
            item.rewaya === currentSuraTrack.rewaya,
        );
        if (isSaved < 0) {
          const jsonValue = JSON.stringify([...savedValue, currentSuraTrack]);
          await AsyncStorage.setItem('favorites', jsonValue);
          setIsFavorite(true);
        } else {
          const temp = savedValue.filter(
            item =>
              item.id !== currentSuraTrack.id &&
              item.title !== currentSuraTrack.title &&
              item.url !== currentSuraTrack.url,
          );
          await AsyncStorage.setItem('favorites', JSON.stringify(temp));

          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentSuraTrack]);

  // track player listner to get sura name
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== null &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, id, url, rewaya, reciterName} = track;

      setCurrentSuraTrack({
        title,
        id,
        url,
        rewaya,
        reciterName,
      });
    }
  });

  // queue endded event
  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    if (repeatMode === 'off') {
      await TrackPlayer.destroy();
      navigation.pop();
    }
  });

  // listerner to skip to next track
  useTrackPlayerEvents([Event.RemoteNext], async event => {
    if (event.type === Event.RemoteNext) {
      skip('next');
    }
  });

  // listerner to skip to previous track
  useTrackPlayerEvents([Event.RemotePrevious], async event => {
    if (event.type === Event.RemotePrevious) {
      skip('prev');
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {/* top section */}
      <View style={styles.topSection}>
        <Text style={styles.suraName}>سورة {suraTitle}</Text>
      </View>
      {/* bottm section */}
      <View style={styles.bottomSection}>
        {/* progress bar section */}
        <View style={styles.progressContainer}>
          <Slider
            style={{width: '90%', height: 40}}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor="#36978B"
            thumbTintColor={colors.primary}
            maximumTrackTintColor="#000000"
            onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
          />
          <View style={styles.progressTime}>
            {/* time left to end the track */}
            <Text style={{fontFamily: fonts.regular}}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substring(11, 19)}
            </Text>
            {/* current position */}
            <Text style={{fontFamily: fonts.regular}}>
              {new Date(progress.position * 1000)
                .toISOString()
                .substring(11, 19)}
            </Text>
          </View>
        </View>
        {/* controlls section */}
        <View style={styles.controlls}>
          {/* repeat mode */}
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={getRepeatIcon()}
              size={24}
              color={repeatMode === 'off' ? colors.gary : colors.primary}
            />
          </TouchableOpacity>
          {/* previous btn */}
          <View style={styles.controllerBoxBtn}>
            <TouchableNativeFeedback
              style={styles.controllerBtn}
              onPress={() => skip('prev')}
              background={TouchableNativeFeedback.Ripple(colors.secondary)}>
              <View style={styles.controllerBtn}>
                <Ionicons name="play-skip-back-outline" size={26} color={colors.primary}/>
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* toggle play btn */}
          <View style={styles.controllerBoxBtn}>
            <TouchableNativeFeedback
              style={styles.controllerBtn}
              onPress={() => togglePlay(playBackState)}
              background={TouchableNativeFeedback.Ripple(colors.text)}>
              <View
                style={[
                  styles.controllerBtn,
                  {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <Ionicons
                  name={
                    playBackState === State.Playing
                      ? 'pause-outline'
                      : 'play-outline'
                  }
                  size={30}
                  color="#fff"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* next btn */}
          <View style={styles.controllerBoxBtn}>
            <TouchableNativeFeedback
              style={styles.controllerBtn}
              onPress={() => skip('next')}
              background={TouchableNativeFeedback.Ripple(colors.secondary)}>
              <View style={styles.controllerBtn}>
                <Ionicons name="play-skip-forward-outline" size={26} color={colors.primary} />
              </View>
            </TouchableNativeFeedback>
          </View>
          {/* add to favorite */}
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.primary : colors.gary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suraName: {
    fontSize: 28,
    fontWeight: 'normal',
    fontFamily: fonts.regular,
    color: colors.primary,
    // marginBottom: 50,
  },
  logo: {
    height: 240,
    width: 240,
    resizeMode: 'cover',
  },
  bottomSection: {
    height: 180,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  controlls: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  controllerBtn: {
    height: 60,
    borderRadius: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controllerBoxBtn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressTime: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    height: 20,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    width: '100%',
    backgroundColor: colors.primary,
    position: 'absolute',
    top: -12,
  },
});
