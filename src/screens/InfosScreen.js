import React from 'react';
import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '@react-navigation/native';
import fonts from '../style/fonts';
import useToggleTheme from '../style/useToggleTheme';

const InfosScreen = () => {
  const {colors} = useTheme();
  const {isDark, setIsDark} = useToggleTheme();

  return (
    <View style={styles.container(colors.background)}>
      <View style={styles.header(colors.primary)} />
      <View style={styles.main}>
        <View>
          <Text style={styles.txt(colors.primaryText)}>مميزات التطبيق :</Text>
          <View style={{height: 10}} />
          <Text style={styles.pos(colors.text)}>
            * تطبيق يقدم أكثر من 220 قارئ للقرآن الكريم
          </Text>
          <Text style={styles.pos(colors.text)}>
            * إضافة السور المفضلة إلى قائمة المفضلة
          </Text>
          <Text style={styles.pos(colors.text)}>
            * إمكانية الإستماع و التحكم خارج التطبيق
          </Text>
          <Text style={styles.pos(colors.text)}>
            * إمكانية الإستماع و التحكم عند غلق الشاشة
          </Text>
          <Text style={styles.pos(colors.text)}>
            * البحث في قائمة القرآء و السور
          </Text>
        </View>

        <View>
          <Text style={styles.txt2(colors.text)}>
            كل الشكر لصاحب السرفرات ♥
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[styles.icon(colors.iconBackground), {marginRight: 5}]}
              onPress={async () => setIsDark(!isDark)}>
              <Ionicons
                name={isDark ? 'ios-sunny' : 'moon'}
                color={colors.background}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon(colors.iconBackground)}
              onPress={async () =>
                Linking.openURL('https://bit.ly/QuraanPlayerRepo')
              }>
              <Ionicons
                name="logo-github"
                color={colors.background}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfosScreen;

const styles = StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  main: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  txtG: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  txt: color => ({
    fontSize: 16,
    color,
    width: '100%',
    textAlign: 'right',
    marginTop: 20,
    fontFamily: fonts.bold,
  }),
  txt2: color => ({
    fontSize: 14,
    color,
    textAlign: 'center',
    marginTop: 12,
    fontFamily: fonts.bold,
  }),
  pos: color => ({
    fontSize: 14,
    color,
    textAlign: 'right',
    width: '100%',
    marginTop: 10,
    fontFamily: fonts.regular,
  }),
  icon: backgroundColor => ({
    marginTop: 20,
    flexDirection: 'row',
    height: 40,
    width: 40,
    // paddingHorizontal: 20,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    alignSelf: 'center',
    fontWeight: 'bold',
  }),
  header: backgroundColor => ({
    height: 20,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    width: '100%',
    backgroundColor,
    position: 'absolute',
    top: -12,
  }),
});
