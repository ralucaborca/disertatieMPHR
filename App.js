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
import Footertabs from './src/navigation/Footertabs';
import Profile from './src/DoctorScreens/Profile';
import PacientsList from './src/DoctorScreens/PacientsList';
import Feedback from './src/DoctorScreens/Feedback';
import ChatWPacient from './src/DoctorScreens/ChatWPacient';
import RegisterPage from './src/RegisterPage';

const Stack = createStackNavigator();

const App = (props) => {
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={Homepage}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="RegisterDoctors" component={RegisterDoctors}/>
        <Stack.Screen name="RegisterPage" component={RegisterPage}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Footertabs" component={Footertabs}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="PacientsList" component={PacientsList}/>
        <Stack.Screen name="Feedback" component={Feedback}/>
        <Stack.Screen name="ChatWPacient" component={ChatWPacient}/>
      </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default App;