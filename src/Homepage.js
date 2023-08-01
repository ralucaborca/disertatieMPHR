import { View, Text, TouchableOpacity, StyleSheet, Button} from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from "react-navigation";
import Register from "./Register";

function Homepage({ navigation }) {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Login
                    </Text>
            </TouchableOpacity>
        <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Register
                    </Text>
            </TouchableOpacity>
      </View>
    );
  }

export default Homepage;

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
        backgroundColor:'#FBE698',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }
  })