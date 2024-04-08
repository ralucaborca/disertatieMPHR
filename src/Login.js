import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation} from '@react-navigation/native';
import { auth, database } from "../config";


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logging in with', user.email);
        
        database.ref('Doctori/' + user.uid).once('value').then(snapshot => {
          if (snapshot.exists()) {
            // User is a doctor
            navigation.navigate('PacientsList');
          } else {
            // User is a patient
            navigation.navigate('Dashboard');
          }
        }).catch(error => {
          console.error("Error checking user type:", error);
        });
      })
      .catch(error => alert(error.message))
  }

  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
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
      <TouchableOpacity
                onPress={handleLogIn}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>
                    Login
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    Nu ai cont? Inregistreaza-te acum.
                    </Text>
            </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default Login;

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
  elevation: 5, // Shadow effect
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
    width:250,
    backgroundColor:'#FFAEBC',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
}
})