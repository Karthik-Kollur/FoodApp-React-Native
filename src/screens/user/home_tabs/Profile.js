import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../common/Header';

let userId = '';

const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');

  useEffect(() => {
    getUserDetails();
  }, [isFocused]);

  const getUserDetails = async () => {
    userId = await AsyncStorage.getItem('USERID');
    setUserName(await AsyncStorage.getItem('NAME'));
    setUserEmail(await AsyncStorage.getItem('Email_Key'));
    setUserMobile(await AsyncStorage.getItem('MOBILE'));

    const user = await firestore().collection('Users').doc(userId).get();
  };

  async function signOut() {
    try {
      await AsyncStorage.clear();
      navigation.navigate('SelectLogin');
      console.log('AsyncStorage data cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title={'Profile'}
        icon={require('../../../images/profile.png')}
        count={1}
        onClickIcon={() => {}}
      />
      <View style={styles.profileView}>
        <View style={styles.profileElements}>
          <View style={styles.sectionContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.userInfo}>{userName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.userInfo}>{userEmail}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Mobile Number:</Text>
              <Text style={styles.userInfo}>{userMobile}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileElements: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
  sectionContainer: {
    borderWidth: 1, // Add a border
    borderColor: '#000', // Border color
    padding: 25, // Padding around the section
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  userInfo: {
    fontSize: 20,
  },
  signOutButton: {
    backgroundColor: '#ff5733',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  signOutText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;
