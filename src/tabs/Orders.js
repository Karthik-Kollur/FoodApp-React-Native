import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Header from '../screens/common/Header';
// import {FlatList} from 'react-native-gesture-handler';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = async () => {
    firestore()
      .collection('orders')
      .get()
      .then(querySnapshot => {
        console.log('Total orders: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            orderId: documentSnapshot.id,
            data: documentSnapshot.data().data,
          });
        });
        console.log(JSON.stringify(tempData));
        setOrders(tempData);
        setOrdersCount(tempData.length);
      });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          textAlign: 'center',
          marginTop: 15,
          marginRight: 20,
          marginBottom: 10,
        }}>
        {' '}
        All Orders : {ordersCount}{' '}
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          console.log('item' + item);
          return (
            <View
              style={[
                styles.orderItem,
                index === orders.length - 1 ? styles.lastItem : null,
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
                data={item.data.items}
                keyExtractor={(innerItem, innerIndex) => `${innerIndex}`}
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
