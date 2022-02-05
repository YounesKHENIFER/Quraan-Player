import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const InfosScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.txt}>مميزات التطبيق :</Text>
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

        <View style={{alignItems: 'center'}}>
          <Text style={styles.txt}>كل الشكر لصاحب السرفرات ♥</Text>
          <Text style={styles.txt}>للمساهمة في تطوير التطبيق يرجى زيارة</Text>
          <TouchableOpacity
            style={styles.github}
            onPress={async () =>
              Linking.openURL('https://bit.ly/QuraanPlayerRepo')
            }>
            <Ionicons name="logo-github" color="#fff" size={30} />
            <Text style={styles.txtG}>GITHUB</Text>
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
    backgroundColor: '#fff',
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
    color: '#eee',
    textAlign: 'center',
  },
  txt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  pos: {
    fontSize: 15,
    color: '#666',
    textAlign: 'right',
    marginTop: 10,
  },
  github: {
    marginTop: 10,
    flexDirection: 'row',
    height: 60,
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    fontWeight: 'bold',
  },
});
