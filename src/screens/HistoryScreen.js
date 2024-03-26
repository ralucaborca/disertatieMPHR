import { View, Text, StyleSheet, TouchableOpacity, Footer, FooterTab, Button, Icon } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const HistoryScreen = () => {
    
    return (
        <View style={styles.container}>
            <Text> HistoryScreenScreen</Text>
            <Text> Inregistrare: {auth.currentUser?.email}</Text>

        </View>

     
    )
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})