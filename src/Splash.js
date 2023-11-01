import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectLogin from './screens/user/SelectLogin';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('SelectLogin');
      checkLogin();
    }, 3000);
  });
  const checkLogin = () => {
    const email = AsyncStorage.getItem('EMAIL');
    if (email !== null) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Food App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});

export default Splash;
