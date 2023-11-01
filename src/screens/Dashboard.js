import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Transactions from '../tabs/Transactions';
import Orders from '../tabs/Orders';
import Notifications from '../tabs/Notifications';
import Items from '../tabs/Items';
import Add from '../tabs/Add';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Transactions />
      ) : selectedTab == 2 ? (
        <Add />
      ) : selectedTab == 3 ? (
        <Orders />
      ) : (
        <Notifications />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/item.png')}
            style={[
              styles.bottomTabImage,
              {height: selectedTab === 0 ? 33 : 27},
              {width: selectedTab === 0 ? 33 : 27},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../images/transactions.png')}
            style={[
              styles.bottomTabImage,
              {height: selectedTab === 1 ? 33 : 27},
              {width: selectedTab === 1 ? 33 : 27},
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <Image
            source={require('../images/add.png')}
            style={[
              styles.bottomTabImage,
              {height: selectedTab === 2 ? 33 : 27},
              {width: selectedTab === 2 ? 33 : 27},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <Image
            source={require('../images/orders.png')}
            style={[
              styles.bottomTabImage,
              {height: selectedTab === 3 ? 33 : 27},
              {width: selectedTab === 3 ? 33 : 27},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomTab]}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <Image
            source={require('../images/notification.png')}
            style={[
              styles.bottomTabImage,
              {height: selectedTab === 4 ? 33 : 27},
              {width: selectedTab === 4 ? 33 : 27},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  bottomTab: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabImage: {
    height: 27,
    width: 27,
  },
});
