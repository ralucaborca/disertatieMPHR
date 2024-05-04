import { StyleSheet, View, Text, FlatList  } from "react-native";
import React, {useState, useEffect} from "react";
import {database, auth } from '../../config';
import { useNavigation} from '@react-navigation/native';


const FeedbackScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [userq, setUserQ] = useState(null);
    
    useEffect(() => {
      navigation.setOptions({
        title: 'Sugestii medic', 
      });
    }, [navigation]);

    const fetchData = async (user) => {
        try {
          const snapshot = await database.ref('Sugestii medic').orderByChild('userId').equalTo(user).once('value');
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
           {item.userName && <Text style={styles.textDisplay}>Nume doctor: {item.userName}</Text>}
          <Text style={styles.textDisplay}>Stare de sanatate: {item.stareSanatate}</Text>
          <Text style={styles.textDisplay}>Sugestie: {item.sugestie}</Text>
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

export default FeedbackScreen;

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
      backgroundColor: '#A9EAFE'
    },
    textDisplay:{
      fontSize:21
    },
})