import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    console.log(userId);
    const user = await firestore().collection('Users').doc(userId).get();
    console.log(JSON.stringify(user._data.orders));
    setOrderList(user._data.orders);
    setOrdersCount(user._data.orders.length);
  };

  return (
    <View style={styles.container}>
      <Header
        title={'My Orders'}
        icon={require('../../../images/orders.png')}
        count={ordersCount}
        onClickIcon={() => {
          // navigation.navigate('Cart');
        }}
      />
      {ordersCount === 0 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            No Orders Yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={orderList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.orderItem,
                  index === orderList.length - 1 ? styles.lastItem : null,
                ]}>
                <View
                  style={{
                    borderBottomWidth: 1,

                    borderBottomColor: 'grey',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '800',
                      fontSize: 20,
                    }}>
                    Order : {index == 0 ? index + 1 : index + 1}
                  </Text>
                </View>
                <FlatList
                  data={item.items}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.itemView}>
                        <Image
                          source={{uri: item.data.imageUrl}}
                          style={styles.itemImage}
                        />
                        <View>
                          <Text style={styles.nameText}>{item.data.name}</Text>
                          <Text style={styles.nameText}>
                            {'Price: ' +
                              item.data.discountPrice +
                              ', Qty: ' +
                              item.data.qty}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Orders;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderItem: {
    width: '90%',

    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
  lastItem: {
    marginBottom: 70, // Add extra margin to the last item becoz of tabBar
  },
});
