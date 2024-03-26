import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../config";
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import Footertabs from "./navigation/Footertabs";

const Dashboard = () => {
    return (
    <NavigationContainer independent={true} style={styles.container}>
        <Footertabs/>
    </NavigationContainer>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    },
    TextInput: {
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center',
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#A4E8E0',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }
})