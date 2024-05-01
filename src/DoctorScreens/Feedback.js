import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth} from '../../config';
import { useNavigation} from '@react-navigation/native';

const Feedback = ({ route }) => {
  const { person } = route.params;
  const [stareSanatate, setStareSanatate] = useState('');
  const [sugestie, setSugestie] = useState('');
  const [user, setUser] = useState(null); // Changed to null to avoid potential issues
  const navigation = useNavigation();

  useEffect(() => {
      const subscriber = auth.onAuthStateChanged(user => {
          setUser(user);
      });
      navigation.setOptions({
          title: 'Sugestii',
      });
      return subscriber;
  }, [navigation]);

  const handleSubmit = async () => {
      try {
          if (!user) {
              console.error('User not authenticated.');
              return;
          }

          const currentUser = auth.currentUser;
          const currentUserDisplayName = currentUser.displayName;
          await database.ref('Sugestii medic').push({
              userId: currentUser.uid, // Changed to use current user ID
              userName: currentUserDisplayName,
              stareSanatate: stareSanatate,
              sugestie: sugestie,
              user: user.uid, // Assuming item.id is the ID of the patient
          });
          // Clear input fields after submission
          setStareSanatate('');
          setSugestie('');
      } catch (error) {
          console.error('Error submitting data:', error);
      }
  };

  return (
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <Text>Nume pacient: {person.userName}</Text>
              <Text>Data adaugarii: {person.dateAdded}</Text>
              <Text>Fumator: {person.fumator}</Text>
              <Text>Greutate: {person.greutate}</Text>
              <Text>Afectiune: {person.afectiune}</Text>
              <Text>Inaltime: {person.inaltime}</Text>
              <Text>Pacientul practica sport: {person.practicSport}</Text>
              <Text>Sex: {person.sex}</Text>
              <Text>Varsta: {person.varsta}</Text>
              <Text style={{ marginTop: 70 }}>Introduceti starea actuala de sanatate a pacientului:</Text>
              <TextInput
                  value={stareSanatate}
                  onChangeText={setStareSanatate}
                  placeholder="Stare actuala de sanatate"
                  style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, marginTop: 10 }}
              />
              <Text style={{ marginTop: 20 }}>Introduceti o sugestie pacientului:</Text>
              <TextInput
                  value={sugestie}
                  onChangeText={setSugestie}
                  placeholder="Sugestie"
                  style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, marginTop: 10 }}
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
      marginBottom: 10,
      padding: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
    },
    button:{
        marginTop:30,
        height:70,
        backgroundColor:'#FFAEBC',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }

})