import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React , {useEffect} from "react";
import { auth, } from "../../config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Profile = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: 'Profil',
        });
      }, [navigation]);
    
    const handleSignOut = async () => {
        try {
          await auth.signOut();
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

    return (
        <View style={styles.container}>
        <Text style={styles.nameDisplay}> Nume: {auth.currentUser?.displayName}</Text>
        <Text style={styles.textDisplay}> Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleSignOut}
        >
            <Text style={{fontWeight:'bold', fontSize:16}}>Iesi din cont</Text>
        </TouchableOpacity>     
     </View>
    );
}

export default Profile;

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
        fontSize:25
    },
    nameDisplay:{
        fontSize:30,
        marginTop: 50
      },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#A4E8E0',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:50,
    },
    imageContainer: {
        width: 150,
        height: 150,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 75,
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    }
})