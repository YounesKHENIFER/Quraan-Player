import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors';
import fonts from '../style/fonts';

const InfosScreen = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => <View />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.main}>
        <View>
          <Text style={styles.txt}>مميزات التطبيق :</Text>
          <View style={{height:10}}/>
          <Text style={styles.pos}>
            * تطبيق يقدم أكثر من 220 قارئ للقرآن الكريم
          </Text>
          <Text style={styles.pos}>
            * إضافة السور المفضلة إلى قائمة المفضلة
          </Text>
          <Text style={styles.pos}>
            * إمكانية الإستماع و التحكم خارج التطبيق
          </Text>
          <Text style={styles.pos}>
            * إمكانية الإستماع و التحكم عند غلق الشاشة
          </Text>
          <Text style={styles.pos}>* البحث في قائمة القرآء و السور</Text>
        </View>

        <View>
          <Text style={styles.txt2}>كل الشكر لصاحب السرفرات ♥</Text>
          <Text style={styles.txt2}>للمساهمة في تطوير التطبيق يرجى زيارة</Text>
          <TouchableOpacity
            style={styles.github}
            onPress={async () =>
              Linking.openURL('https://bit.ly/QuraanPlayerRepo')
            }>
            <Ionicons name="logo-github" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  txt: {
    fontSize: 16,
    color: colors.text,
    width: '100%',
    textAlign: 'right',
    marginTop: 20,
    fontFamily: fonts.bold,
  },
  txt2: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 12,
    fontFamily: fonts.bold,
  },
  pos: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'right',
    width: '100%',
    marginTop: 10,
    fontFamily: fonts.regular,
  },
  github: {
    marginTop: 20,
    flexDirection: 'row',
    height: 40,
    width: 40,
    // paddingHorizontal: 20,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.text,
    alignSelf: 'center',
    fontWeight: 'bold',
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
