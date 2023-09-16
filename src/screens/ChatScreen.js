import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
    
    return (
        <View style={styles.container}>
            <Text> ChatScreen</Text>
        </View>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})