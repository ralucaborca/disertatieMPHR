import { StyleSheet, View, Text, FlatList  } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth } from '../../config';

const HistoryScreen = () => {
    const [data, setData] = useState([]);
    const [userq, setUserQ] = useState(null);

  
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
      <View  style={styles.itemContainer}>
        <Text>Data adaugarii: {item.dateAdded}</Text>
        <Text>Fumator: {item.fumator}</Text>
        <Text>Greutate: {item.greutate}</Text>
        <Text>Afectiune: {item.afectiune}</Text>
        <Text>Inaltime: {item.inaltime}</Text>
        <Text>Pacientul practica sport: {item.practicSport}</Text>
        <Text>Sex: {item.sex}</Text>
        <Text>Varsta: {item.varsta}</Text>
      </View>
      
    );
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:20,
    },
    itemContainer: {
      marginBottom: 10, // Adjust this value as needed to add spacing between items
      padding: 10,
      backgroundColor: 'white', // Optional background color
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
    }

})