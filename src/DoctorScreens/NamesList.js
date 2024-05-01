import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import {database } from '../../config';
import {useNavigation} from '@react-navigation/native';

const NamesList  = ({data: propData}) => {
    const [data, setData] = useState(propData || []);
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
          title: 'Lista pacientilor',
        });

        return () => {
        };
      }, [navigation]);

      const handleClick = (item) => {
        navigation.navigate('PacientsList', { person: item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleClick(item)}>
        <View style={styles.itemContainer}>
        {item.userName && <Text>Nume pacient: {item.userName}</Text>}
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

export default NamesList;

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
})