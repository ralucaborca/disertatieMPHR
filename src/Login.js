import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Image, Alert } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation} from '@react-navigation/native';
import { auth, database } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: 'Intra in cont', 
    });
  }, [navigation]);

  const handleLogIn = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Alert.alert('Error', 'Completati campul email.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Introduceti o adesa de email valida.');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Completati campul parola.');
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logging in with', user.email);
        
        database.ref('Doctori/' + user.uid).once('value').then(snapshot => {
          if (snapshot.exists()) {
            // User is a doctor
            navigation.navigate('DoctorNavigator');
          } else {
            // User is a patient
            navigation.navigate('PacientNavigator');
          }
        }).catch(error => {
          console.error("Error checking user type:", error);
        });
        
        
        setPassword('');
      })
      .catch(error => {
        // Verificare dacă eroarea este din cauza lipsei adresei de email în baza de date
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'Adresa de email nu exista in baza de date.');
        } else {
          alert(error.message);
        }
      });
  }

  return(
    <KeyboardAvoidingView style={styles.container}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.image}
        />
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
                    Intra in cont
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
  width: '90%',
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
    backgroundColor:'#FFAEBC',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
},
image: {
  marginTop: -50,
  marginBottom: 30,
  width: 200,
  height: 200,
  resizeMode: 'contain',
},
})