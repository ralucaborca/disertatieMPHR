import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from "react-navigation";
import Register from "./Register";
import RegisterDoctors from "./RegisterDoctors";

function RegisterPage () {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: 'Inregistrare noua', // Change this to the desired title
        });
      }, [navigation]);
    
    return (
      <View style={styles.container}>
        <Image 
        source={require('../assets/logo.png')}
        style={styles.image}
        />
        <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Inregistrare Pacient
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterDoctors')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Inregistrare Doctor
                    </Text>
            </TouchableOpacity>
      </View>
    );
  }

export default RegisterPage;

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
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain', // Adjust the image content mode as needed
    },
  })