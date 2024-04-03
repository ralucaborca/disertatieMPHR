import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation} from '@react-navigation/native';
import { database, firebase } from '../../config';
import {ref, set} from 'firebase/compat/database';
import { auth } from "../../config";

const AddScreen = () => {
    const [user, setUser] = useState('');
    const [sex, setSex] = useState('');
    const [varsta, setVarsta] = useState('');
    const [inaltime, setInaltime] = useState('');
    const [greutate, setGreutate] = useState('');
    const [afectiune, setAfectiune] = useState('');
    const [fumator, setFumator] = useState('');
    const [practicSport, setPracticSport] = useState('');

    useEffect(() => {
      const subscriber = auth.onAuthStateChanged(user => {
        setUser(user); // Set the current user
      });
  
      // Unsubscribe on component unmount
      return subscriber;
    }, []); 
  
    const handleSaveData = () => {
        if (user && sex && varsta && inaltime && greutate && afectiune && fumator && practicSport) {
            database.ref().child('Date pacient').push({
              user: user.uid,
              sex: sex,
              varsta: varsta,
              inaltime: inaltime,
              greutate: greutate,
              afectiune: afectiune,
              fumator: fumator,
              practicSport: practicSport
            })
            .then(() => {
              Alert.alert('Success', 'Datele au fost adaugate cu success!');
              setSex('');
              setVarsta('');
              setInaltime('');
              setGreutate('');
              setAfectiune('');
              setFumator('');
              setPracticSport('');
            })
            .catch(error => {
              Alert.alert('Error', 'Failed to save data: ' + error.message);
            });
          } else {
            Alert.alert('Error', 'Please fill in all fields.');
          }
    };
  
    return (
      <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.TextInput}
          placeholder="Sex"
          value={sex}
          onChangeText={(text) => setSex(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Varsta"
          value={varsta}
          onChangeText={(text) => setVarsta(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Inaltime"
          value={inaltime}
          onChangeText={(text) => setInaltime(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Greutate"
          value={greutate}
          onChangeText={(text) => setGreutate(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Afectiune"
          value={afectiune}
          onChangeText={(text) => setAfectiune(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Fumator"
          value={fumator}
          onChangeText={(text) => setFumator(text)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Practic sport"
          value={practicSport}
          onChangeText={(text) => setPracticSport(text)}
        />

        <Button title="Save" onPress={handleSaveData} />
      </View>
      </KeyboardAvoidingView>
    );
  };

export default AddScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems:'center',
      marginTop:10,
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