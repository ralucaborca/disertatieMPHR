import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth } from '../../config';
import {useNavigation} from '@react-navigation/native';

const PacientsList  = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const snapshot = await database.ref('Date pacient').once('value');
            const dataArr = [];
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
    
        fetchData();

        navigation.setOptions({
          title: 'Lista pacientilor', // Change this to the desired title
        });

        return () => {
          // Cleanup function if needed
        };
      }, [navigation]);

      const handleItemClick = (item) => {
        // Handle item click, e.g., navigate to a details screen
        navigation.navigate('Feedback', { item });
      };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
        <View style={styles.itemContainer}>
          <Text>Data adaugarii: {item.dateAdded}</Text>
          <Text>Fumator: {item.fumator}</Text>
          <Text>Greutate: {item.greutate}</Text>
          <Text>Afectiune: {item.afectiune}</Text>
          <Text>Inaltime: {item.inaltime}</Text>
          <Text>Pacientul practica sport: {item.practicSport}</Text>
          <Text>Sex: {item.sex}</Text>
          <Text>Varsta: {item.varsta}</Text>
        </View>
      </TouchableOpacity>
      
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

export default PacientsList;

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
      width: '100%',
      backgroundColor: '#A9EAFE'
    }

})