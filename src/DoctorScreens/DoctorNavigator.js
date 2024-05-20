import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import { useNavigation, useRoute } from '@react-navigation/native';
import NamesList from "./NamesList";
import PulseImages from "./PulseImages";

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
            initialRouteName="NamesList"
            screenOptions={{ headerShown: true }}
        >
            <Tab.Screen
                name="Profil"
                component={Profile}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="PulseImages"
                component={PulseImages}
                options={({ route }) => ({
                    tabBarLabel: 'Imagini',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="image" color={color} size={size} />
                    ),
                })}
            />
            <Tab.Screen
                name="NamesList"
                component={NamesList}
                options={{
                    tabBarLabel: 'Lista',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default DoctorNavigator;