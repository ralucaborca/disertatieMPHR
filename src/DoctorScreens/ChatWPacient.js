import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, {useEffect} from "react";
import { useNavigation} from '@react-navigation/native';

const ChatWPacient = () => {

    const navigation = useNavigation();

    useEffect(() => {
        // Set the header title dynamically
        navigation.setOptions({ headerTitle: 'ChatWPacient' });
    }, []);
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