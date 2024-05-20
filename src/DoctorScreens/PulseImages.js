import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { database, auth } from '../../config';
import { useNavigation } from '@react-navigation/native';

const PulseImages = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Imagini',
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const snapshot = await database.ref('Imagini').once('value');
      if (snapshot.exists()) {
        const dataArr = [];
        snapshot.forEach((childSnapshot) => {
          dataArr.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setData(dataArr);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchData(user.uid);
      } else {
        setData([]);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.textDisplay}>Nume: {item.name}</Text>
      <Text style={styles.textDisplay}>Data adaugarii: {item.dateAdded}</Text>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
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
};

export default PulseImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#A9EAFE',
  },
  textDisplay: {
    fontSize: 21,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});