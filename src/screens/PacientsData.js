import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth } from '../../config';
import {useNavigation} from '@react-navigation/native';

const PacientsData  = ({data: propData}) => {
    const [data, setData] = useState(propData || []);
    const navigation = useNavigation();
    const [userq, setUserQ] = useState(null);

    useEffect(() => {
      navigation.setOptions({
        title: 'Date personale',
      });
    }, [navigation]);
  
    const fetchData = async (user) => {
        try {
          const snapshot = await database.ref('Date pacient').orderByChild('user').equalTo(user).once('value');
          const dataArr = [];
          console.log(snapshot)
          snapshot.forEach((childSnapshot) => {
            dataArr.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          setData(dataArr);
        } catch (error) {
          console.log('Error fetching data: ', error);
        }
      };
  
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUserQ(user);
            fetchData(user.uid);
          } else {
            setData([]);
            setUserQ(null);
          }
        });
    
        return () => unsubscribe();
      }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.textDisplay}>Data adaugarii: {item.dateAdded}</Text>
            <Text style={styles.textDisplay}>Fumator: {item.fumator}</Text>
            <Text style={styles.textDisplay}>Greutate: {item.greutate}</Text>
            <Text style={styles.textDisplay}>Afectiune: {item.afectiune}</Text>
            <Text style={styles.textDisplay}>Inaltime: {item.inaltime}</Text>
            <Text style={styles.textDisplay}>Pacientul practica sport: {item.practicSport}</Text>
            <Text style={styles.textDisplay}>Sex: {item.sex}</Text>
            <Text style={styles.textDisplay}>Varsta: {item.varsta}</Text>
        </View>
      
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
    
}

export default PacientsData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:20,
    },
    itemContainer: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      width: '100%',
      backgroundColor: '#A9EAFE'
    },
    textDisplay:{
      fontSize:25
    },
})