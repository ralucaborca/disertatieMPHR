import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const Screen = () => {
    
    return (
        <View style={styles.container}>
            <Text> Screen</Text>
        </View>
    )
}

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})