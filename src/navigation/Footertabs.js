import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddScreen from "../screens/AddScreen";
import ChatScreen from "../screens/ChatScreen";
import HistoryScreen from "../screens/HistoryScreen";
import FirstScreen from "../screens/FirstScreen";
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Footertabs = () =>{
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerShown: true }}
        >
            <Tab.Screen
                name="Profile"
                component={FirstScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),
                    // Dynamically set the header title based on the active screen
                    headerTitle: route.name === 'ChatWPacient' ? 'ChatWPacient' : undefined,
                })}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                    ),
                }}
            />
          
        </Tab.Navigator>
    );
}

export default Footertabs;