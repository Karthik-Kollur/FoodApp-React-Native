import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';
import {translation} from '../../LanguageUtils';

const UserLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    console.log(await AsyncStorage.getItem('LANG'));

    let lang = await AsyncStorage.getItem('LANG');
    console.log(lang);
    if (lang !== null) {
      setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
    } else {
      setSelectedLang(0);
    }
  };

  const adminLogin = async () => {
    setModalVisible(true);
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);

        console.log(querySnapshot.docs[0]._data);

        if (querySnapshot.docs[0]._data !== null) {
          if (
            querySnapshot.docs[0]._data.email === email &&
            querySnapshot.docs[0]._data.password === password
          ) {
            goToNextScreen(
              querySnapshot.docs[0]._data.userId,
              querySnapshot.docs[0]._data.mobile,
              querySnapshot.docs[0]._data.name,
            );
          } else {
            alert('Please Enter Valid email and password');
          }
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
        alert('Please Check Email and password');
      });
  };
  const goToNextScreen = async (userId, mobile, name) => {
    await AsyncStorage.setItem('Email_Key', email);
    await AsyncStorage.setItem('USERID', userId);
    await AsyncStorage.setItem('MOBILE', mobile);
    await AsyncStorage.setItem('NAME', name);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedLang == 0
          ? translation[1].English
          : selectedLang == 1
          ? translation[1].Kannada
          : selectedLang == 2
          ? translation[1].Tamil
          : selectedLang == 3
          ? translation[1].Hindi
          : selectedLang == 4
          ? translation[1].Punjabi
          : selectedLang == 5
          ? translation[1].Urdu
          : null}
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Email Id"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Enter Email and password');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('UserSignup');
        }}>
        Create New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    height: 55,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,

    alignSelf: 'center',

    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,

    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
  },
});

export default UserLogin;
