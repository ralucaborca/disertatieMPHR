import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import {useNavigation} from '@react-navigation/native';

const PacientsList  = ({route}) => {
    const { person } = route.params;
    const navigation = useNavigation();

    navigation.setOptions({
      title: 'Datele pacientului',
    });

    const handleFeedbackClick = () => {
      navigation.navigate('Feedback', { person });
    };


    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleFeedbackClick}>
        <View style={styles.itemContainer}>
            <Text>Nume pacient: {person.userName}</Text>
            <Text>Data adaugarii: {person.dateAdded}</Text>
            <Text>Fumator: {person.fumator}</Text>
            <Text>Greutate: {person.greutate}</Text>
            <Text>Afectiune: {person.afectiune}</Text>
            <Text>Inaltime: {person.inaltime}</Text>
            <Text>Pacientul practica sport: {person.practicSport}</Text>
            <Text>Sex: {person.sex}</Text>
            <Text>Varsta: {person.varsta}</Text>
        </View>
        </TouchableOpacity>
      </View> 
    );

}

export default PacientsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:20,
        marginLeft:30,
        marginRight:30
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