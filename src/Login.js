import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, {useState} from "react";
import { useNavigation} from '@react-navigation/native';
import { auth, firebase } from "../config";


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
    })
    .catch(error => alert(error.message))
  }

  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
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
                onPress={() => loginUser(email, password)}
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
    /*const navigation = useNavigation();
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');

    loginUser = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
        }catch(error){
            alert(error.message)
        }
    }

    return(
        
            <View style={styles.container}>
                <TextInput 
                    style={styles.TextInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput 
                    style={styles.TextInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
           
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
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
                    Don't have an account? Register now!
                    </Text>
            </TouchableOpacity>
        </View>
    )*/
}

export default Login;

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
        backgroundColor:'#FFAEBC',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    }
})



/*const {initializing, setInitializing} = useState(true);
  const {user, setUser} = useState;

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  if(!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerTitle: () => <Header name="MPHR Login"/>,
          headerStyle:{
            height: 150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColos: '#000',
            elevation: 25
          }
        }}
        />*

<Stack.Screen 
        name="Register" 
        component={Register} 
        options={{
          headerTitle: () => <Header name="MPHR Register"/>,
          headerStyle:{
            height: 150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColos: '#000',
            elevation: 25
          }
        }}
        />
      </Stack.Navigator>
    );
  }
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          headerTitle: () => <Header name="MPHR Dashboard"/>,
          headerStyle:{
            height: 150,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50,
            backgroundColor:'#00e4d0',
            shadowColos: '#000',
            elevation: 25
          }
        }}
        />
    </Stack.Navigator>
  );
}

export default () =>{
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )*/