import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const AddScreen = () => {
    
    return (
        <View style={styles.container}>
            <Text> AddScreen</Text>
        </View>
    )
}

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})