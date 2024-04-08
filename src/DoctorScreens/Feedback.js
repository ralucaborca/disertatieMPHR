import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth} from '../../config';

const Feedback = ({route}) => {
    const { item } = route.params;
    const [stareSanatate, setStareSanatate] = useState('');
    const [sugestie, setSugestie] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(user => {
          setUser(user);
        });
        return subscriber;
      }, []);

    const handleSubmit = async () => {
        try {
          database.ref().child('Sugestii medic').push({
            userId: item.user,
            user: user.uid,
            stareSanatate: stareSanatate,
            sugestie: sugestie,
            
          });
         console.log(item.user);
          setStareSanatate('');
          setSugestie('');
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };

    return (
        <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text>Data adaugarii: {item.dateAdded}</Text>
          <Text>Fumator: {item.fumator}</Text>
          <Text>Greutate: {item.greutate}</Text>
          <Text>Afectiune: {item.afectiune}</Text>
          <Text>Inaltime: {item.inaltime}</Text>
          <Text>Pacientul practica sport: {item.practicSport}</Text>
          <Text>Sex: {item.sex}</Text>
          <Text>Varsta: {item.varsta}</Text>
          <TextInput
        value={stareSanatate}
        onChangeText={setStareSanatate}
        placeholder="Stare de sanatate"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        value={sugestie}
        onChangeText={setSugestie}
        placeholder="Sugestie"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
        >
            <Text>Adauga</Text>
        </TouchableOpacity>  
      </View>
      </View>
    );
}

export default Feedback;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:20,
    },
    itemContainer: {
      marginBottom: 10, // Adjust this value as needed to add spacing between items
      padding: 10,
      backgroundColor: 'white', // Optional background color
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
    },
    button:{
        marginTop:30,
        height:70,
        width:250,
        backgroundColor:'#A4E8E0',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }

})