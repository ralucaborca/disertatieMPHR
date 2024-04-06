import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const ChatWPacient = () => {
    
    return (
        <View style={styles.container}>
            <Text> ChatWPacient</Text>
        </View>
    )
}

export default ChatWPacient;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})