import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, {useState} from "react";
import { useNavigation} from '@react-navigation/native';
import { auth, firebase, database } from "../config";

const RegisterDoctors = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [adresaCabinet, setAdresaCabinet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Cele 2 parole nu se potrivesc!");
      return;
    }
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      database.ref().child('Doctori/' + userCredentials.user.uid).set({
        name: name,
        email: email,
        adresaCabinet: adresaCabinet
      }).then(() => {
        console.log("User data added to Firebase Realtime Database");
      }).catch(error => {
        console.error("Error adding user data to Firebase Realtime Database:", error);
      });
      //const user = userCredentials.user;
      //console.log(user.email);
    })
    .catch(error => alert(error.message))
  }

  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
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
                    placeholder="Adresa Cabinet"
                    value={adresaCabinet}
                    onChangeText={(text) => setAdresaCabinet(text)}
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
                    Register
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Ai deja cont? Intra in cont acum.
                    </Text>
            </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default RegisterDoctors;

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
        backgroundColor:'#A4E8E0',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }
})