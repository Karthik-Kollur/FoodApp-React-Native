import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Items = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    getItems();
  }, [isFocused]);
  const getItems = () => {
    firestore()
      .collection('Items')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
          setItems(tempData);
          setItemCount(tempData.length);
          console.log(tempData);
        });
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('Items')
      .doc(docId)
      .delete()
      .then(() => {
        alert('Successfully deleted the Item');
        console.log('Item deleted!');
        getItems();
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
        Number of Items : {itemCount}{' '}
      </Text>
      {items.length === 0 ? (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>No items to display</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.itemView,
                  index === items.length - 1 ? styles.lastItem : null,
                ]}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={styles.itemImage}
                />
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{item.data.name}</Text>
                  <Text style={styles.descText}>{item.data.description}</Text>
                  <View style={styles.priceView}>
                    <Text style={styles.priceText}>
                      {'$' + item.data.discountPrice}
                    </Text>
                    <Text style={styles.discountText}>
                      {'$' + item.data.price}
                    </Text>
                  </View>
                </View>
                <View style={{margin: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('EditItem', {
                        data: item.data,
                        id: item.id,
                      });
                    }}>
                    <Image
                      source={require('../images/edit.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteItem(item.id);
                    }}>
                    <Image
                      source={require('../images/delete.png')}
                      style={[styles.icon, {marginTop: 20}]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },

  nameView: {
    width: '53%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    tWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  icon: {
    height: 24,
    width: 24,
  },
  emptyView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastItem: {
    marginBottom: 70, // Add extra margin to the last item becoz of tabBar
  },
});
