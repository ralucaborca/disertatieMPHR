import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation} from '@react-navigation/native';

const Profile = () => {
    
    return (
        <View style={styles.container}>
            <Text> Profile</Text>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})