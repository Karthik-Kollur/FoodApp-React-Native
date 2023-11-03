import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  async function clearAllAsyncStorage() {
    try {
      await AsyncStorage.clear();
      navigation.navigate('SelectLogin');
      console.log('AsyncStorage data cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          clearAllAsyncStorage();
        }}>
        <Text style={{padding: 30, fontSize: 20}}>clear All Async storage</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
