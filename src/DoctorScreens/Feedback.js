import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
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

  const formatDateTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ro-RO', options);
  };

  const handleSubmit = async () => {

    if (!stareSanatate) {
        Alert.alert('Error', 'Completati campul stare de sanatate.');
        return;
    }
    if (!sugestie) {
        Alert.alert('Error', 'Completati campul sugestie.');
        return;
    }
      try {
          const currentUser = auth.currentUser;
          const currentUserDisplayName = currentUser.displayName;
          await database.ref('Sugestii medic').push({
              userId: person.user,
              userName: currentUserDisplayName,
              stareSanatate: stareSanatate,
              sugestie: sugestie,
              user: currentUser.uid,
              dataAdaugarii: formatDateTime(new Date())
          });

          setStareSanatate('');
          setSugestie('');
          Alert.alert('Success', 'Sugestia a fost adaugata cu succes!');
      } catch (error) {
          console.error('Error submitting data:', error);
      }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.itemContainer}>
              <Text style={styles.textDisplay}>Nume pacient: {person.userName}</Text>
              <Text style={styles.textDisplay}>Data adaugarii: {person.dateAdded}</Text>
              <Text style={styles.textDisplay}>Fumator: {person.fumator}</Text>
              <Text style={styles.textDisplay}>Greutate: {person.greutate}</Text>
              <Text style={styles.textDisplay}>Afectiune: {person.afectiune}</Text>
              <Text style={styles.textDisplay}>Inaltime: {person.inaltime}</Text>
              <Text style={styles.textDisplay}>Pacientul practica sport: {person.practicSport}</Text>
              <Text style={styles.textDisplay}>Sex: {person.sex}</Text>
              <Text style={styles.textDisplay}>Varsta: {person.varsta}</Text>
              <Text style={{ marginTop: 70, fontSize:20 }}>Introduceti starea actuala de sanatate a pacientului:</Text>
              <TextInput
                  value={stareSanatate}
                  onChangeText={setStareSanatate}
                  placeholder="Stare actuala de sanatate"
                  style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, marginTop: 10 }}
              />
              <Text style={{ marginTop: 20, fontSize:20 }}>Introduceti o sugestie pacientului:</Text>
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
      </ScrollView>
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
    },
    textDisplay:{
        fontSize:20
    },
})