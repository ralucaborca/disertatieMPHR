import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

function Homepage() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: 'Aplicatia inimii',
        });
      }, [navigation]);

    return (
      <View style={styles.container}>
        <Image 
        source={require('../assets/doctor.png')}
        style={styles.image}
        />
        <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Intra in cont
                    </Text>
            </TouchableOpacity>
        <TouchableOpacity
                onPress={() => navigation.navigate('RegisterPage')}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Inregistreaza-te
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
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
  },
  })