
import React , {useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../../config";
import { useNavigation} from '@react-navigation/native';


const FirstScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = async () => {
        try {
          await auth.signOut();
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

    useEffect(() => {
        navigation.setOptions({
          title: 'Profil', 
        });
      }, [navigation]);


     return (
        <View style={styles.container}>
        <Text style={styles.textDisplay}> Email: {auth.currentUser?.email}</Text>
        <Text style={styles.textDisplay}> Nume: {auth.currentUser?.displayName}</Text>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleSignOut}
        >
            <Text>Sign Out</Text>
        </TouchableOpacity>     
     </View>
     )
 }

export default FirstScreen;

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
    textDisplay:{
        fontSize:20
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