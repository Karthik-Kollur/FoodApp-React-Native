import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './Splash';
import login from './login';
import Dashboard from './screens/Dashboard';
import EditItem from './screens/EditItem';
import SelectLogin from './screens/user/SelectLogin';
import UserLogin from './screens/user/UserLogin';
import UserSignup from './screens/user/UserSignup';
import Home from './screens/user/Home';
import Cart from './screens/user/Cart';
import Checkout from './screens/user/checkout/Checkout';
import Address from './screens/user/checkout/Address';
import AddNewAddress from './screens/user/checkout/AddNewAddress';
import OrderStatus from './screens/user/checkout/OrderStatus';
// import Checkout from './screens/user/checkout/checkout';
// import Address from './screens/user/checkout/Address';
// import AddNewAddress from './screens/user/checkout/AddNewAddress';
// import OrderStatus from './screens/user/checkout/OrderStatus';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="login"
          component={login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectLogin"
          component={SelectLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: true}}
        />
        <Stack.Screen
          component={Checkout}
          name="Checkout"
          options={{headerShown: true}}
        />
        <Stack.Screen
          component={Address}
          name="Address"
          options={{headerShown: true}}
        />
        <Stack.Screen
          component={AddNewAddress}
          name="AddNewAddress"
          options={{headerShown: true}}
        />
        <Stack.Screen
          component={OrderStatus}
          name="OrderStatus"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
