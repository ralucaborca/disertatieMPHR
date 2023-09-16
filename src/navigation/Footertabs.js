import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Dashboard from "../Dashboard";
import AddScreen from "../screens/AddScreen";
import ChatScreen from "../screens/ChatScreen";
import HistoryScreen from "../screens/HistoryScreen";
import Screen from "../screens/Screen";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const Footertabs = () =>{
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{
                position: "absolute",
                bottom: 25,
                left: 20,
                right:20,
                elevation: 0,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 90,
            }
        }}
        >
            <Tab.Screen name="AddScreen" component={AddScreen} />
            <Tab.Screen name="ChatScreen" component={ChatScreen} />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
            <Tab.Screen name="Screen" component={Screen} />
        </Tab.Navigator>
    );
}

export default Footertabs;