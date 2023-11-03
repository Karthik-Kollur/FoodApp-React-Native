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
    //    const email = AsyncStorage.getItem('Email_Key');
    AsyncStorage.getItem('Email_Key')
      .then(value => {
        if (value !== null) {
          navigation.navigate('Home');
          console.log(`Value for ${key}: ${value}`);
        } else {
          // The item doesn't exist
          navigation.navigate('SelectLogin');
          console.log(`No value found for ${key}`);
        }
      })
      .catch(error => {
        // Handle any errors that may occur during the retrieval
        console.error('Error retrieving item:', error);
      });
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
