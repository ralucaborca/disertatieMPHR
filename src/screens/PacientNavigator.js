import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import FirstScreen from "./FirstScreen";
import AddScreen from "./AddScreen";
import ChatScreen from "./ChatScreen";
import HistoryScreen from "./HistoryScreen";
import FeedbackScreen from "./FeedbackScreen";

const Tab = createBottomTabNavigator();

const PacientNavigator = () => {
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="FirstScreen"
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
                name="Adauga"
                component={AddScreen}
                options={{
                    tabBarLabel: 'Adauga',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
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
                name="Istoric"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'Istoric',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="history" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Sugestii"
                component={FeedbackScreen}
                options={{
                    tabBarLabel: 'Sugestii',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="comment" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default PacientNavigator;