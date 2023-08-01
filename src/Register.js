import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Register = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.TextInput}
                placeholder="Nume"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput 
                style={styles.TextInput}
                placeholder="Prenume"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput 
                style={styles.TextInput}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput 
                style={styles.TextInput}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
            />
            <TextInput 
                style={styles.TextInput}
                placeholder="Reintroducere parola"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>
                    Register
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Ai deja cont? Intra in cont.
                    </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;

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