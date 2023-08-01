import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { firebase } from './config';
import { useNavigation } from '@react-navigation/native';

import Homepage from './src/Homepage';
import Register from './src/Register';
import Login from './src/Login';

const Stack = createStackNavigator();

const App = (props) => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={Homepage}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default App;