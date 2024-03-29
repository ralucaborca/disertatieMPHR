import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
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
  
    const handleSaveData = () => {
        if (sex && varsta && inaltime && greutate && afectiune && fumator && practicSport) {
            database.ref().child('Date pacient').push({
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
      <View style="styles.container">
        <TextInput
          placeholder="Sex"
          value={sex}
          onChangeText={(text) => setSex(text)}
        />
        <TextInput
          placeholder="Varsta"
          value={varsta}
          onChangeText={(text) => setVarsta(text)}
        />
        <TextInput
          placeholder="Inaltime"
          value={inaltime}
          onChangeText={(text) => setInaltime(text)}
        />
        <TextInput
          placeholder="Greutate"
          value={greutate}
          onChangeText={(text) => setGreutate(text)}
        />
        <TextInput
          placeholder="Afectiune"
          value={afectiune}
          onChangeText={(text) => setAfectiune(text)}
        />
        <TextInput
          placeholder="Fumator"
          value={fumator}
          onChangeText={(text) => setFumator(text)}
        />
        <TextInput
          placeholder="Practic sport"
          value={practicSport}
          onChangeText={(text) => setPracticSport(text)}
        />

        <Button title="Save" onPress={handleSaveData} />
      </View>
    );
  };

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    }

})