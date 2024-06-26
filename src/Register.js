import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation} from '@react-navigation/native';
import { auth, database } from "../config";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [prenume, setPrenume] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: 'Intra in cont', 
    });
  }, [navigation]);

  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      Alert.alert('Error', 'Completati campul nume.');
      return;
    }
    if (!prenume) {
      Alert.alert('Error', 'Completati campul prenume.');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Completati campul email.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Introduceti o adesa de email valida.');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Completati campul parolei.');
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Parola trebuie sa aiba cel putin 6 caractere!");
      return;
    }
    if (!confirmPassword) {
      Alert.alert('Error', 'Completati campul confirmarii parolei.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error","Cele 2 parole nu se potrivesc!");
      return;
    }
    
    database.ref('Pacienti').orderByChild('email').equalTo(email).once('value', snapshot => {
      if (snapshot.exists()) {
          Alert.alert('Error', 'Adresa de email este deja folosita.');
      } else {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      userCredentials.user.updateProfile({
        displayName: name + ' ' + prenume 
      }).then(() => {
        database.ref().child('Pacienti/' + userCredentials.user.uid).set({
          name: name,
          prenume: prenume,
          email: email
        }).then(() => {
          Alert.alert('Success', `Inregistrarea dumneavoastra a avut loc cu success, ${name} ${prenume}!`);
        }).catch(error => {
          console.error("Eroare in adaugarea datelor.", error);
        });
      }).catch(error => {
        console.error("Eroare in actualizarea datelor.", error);
      });
    })
    .catch(error => alert(error.message))
    }
  }
  )};

  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
      <TextInput 
                    style={styles.TextInput}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
      />
      <TextInput 
                    style={styles.TextInput}
                    placeholder="Prenume"
                    value={prenume}
                    onChangeText={(text) => setPrenume(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
      />
      <TextInput 
                    style={styles.TextInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
      />
       <TextInput 
                    style={styles.TextInput}
                    placeholder="Parola"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
      />
      <TextInput 
                    style={styles.TextInput}
                    placeholder="Reintroduceti parola"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
      />
            <TouchableOpacity
                onPress={handleSignUp}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Inregistreaza-te
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:15}}>
                    Ai deja cont? Intra in cont acum.
                    </Text>
            </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    marginTop:50,
    padding: 20,
    borderRadius: 20
},
formContainer: {
  width: '85%',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  elevation: 5, 
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
    marginTop:50,
    height:70,
    backgroundColor:'#A4E8E0',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
}
})