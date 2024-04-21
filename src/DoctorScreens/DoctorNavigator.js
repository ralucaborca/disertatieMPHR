import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChatWPacient from "./ChatWPacient";
import PacientsList from "./PacientsList";
import Profile from "./Profile";
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const DoctorNavigator = () => {
    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName="PacientsList"
            screenOptions={{ headerShown: true }}
        >
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="ChatWPacient"
                component={ChatWPacient}
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
                name="PacientsList"
                component={PacientsList}
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

export default DoctorNavigator;