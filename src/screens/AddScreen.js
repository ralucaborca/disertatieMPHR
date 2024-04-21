import { View, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import React, {useState, useEffect} from "react";
import { database } from '../../config';
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
        setUser(user);
      });
      return subscriber;
    }, []); 

    const formatDateTime = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString('en-GB', options);
    };
  
    const handleSaveData = () => {
        if (user && sex && varsta && inaltime && greutate && afectiune && fumator && practicSport) {

          const currentUser = auth.currentUser;
          const currentUserDisplayName = currentUser.displayName;

          const currentDate = new Date();
           const formattedDate = formatDateTime(currentDate);
            database.ref().child('Date pacient').push({
              user: user.uid,
              userName: currentUserDisplayName,
              sex: sex,
              varsta: varsta,
              inaltime: inaltime,
              greutate: greutate,
              afectiune: afectiune,
              fumator: fumator,
              practicSport: practicSport,
              dateAdded: formattedDate
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
      <KeyboardAvoidingView >
        <ScrollView>
      <View style={styles.formContainer}>
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
        <TouchableOpacity
                onPress={handleSaveData}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Salveaza
                    </Text>
            </TouchableOpacity>
      </View>
      </ScrollView>
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
      fontSize:20,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      marginBottom:10,
      textAlign:'center',
  },
  button:{
      marginTop:30,
      height:70,
      backgroundColor:'#A4E8E0',
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:50,
  },
  formContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginLeft: 30
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#A9EAFE'
  }
})