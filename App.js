import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { firebase } from './config';
import { useNavigation } from '@react-navigation/native';

import Homepage from './src/Homepage';
import Register from './src/Register';
import RegisterDoctors from './src/RegisterDoctors';
import Login from './src/Login';
import Dashboard from './src/Dashboard';
import AddScreen from './src/screens/AddScreen';
import ChatScreen from './src/screens/ChatScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import Screen from './src/screens/Screen';
import Footertabs from './src/navigation/Footertabs';

const Stack = createStackNavigator();

const App = (props) => {
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={Homepage}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="RegisterDoctors" component={RegisterDoctors}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Footertabs" component={Footertabs}/>
      </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default App;