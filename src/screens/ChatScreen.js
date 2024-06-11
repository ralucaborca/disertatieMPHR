import React, { useState, useEffect } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, database, auth } from '../../config';

const ChatScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Please grant access to your photo library to use this feature.');
      }
    })();
  }, []);
   
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return subscriber;
  }, []); 

  const formatDateTime = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
     };
    return date.toLocaleDateString('ro-RO', options);
  };

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          console.log("URI:", result.assets[0].uri);
          setSelectedImage(result.assets[0].uri);
        } else {
          Alert.alert('Error', 'A aparut o eroare pentru URI. Incearca din nou.');
        }
      } else {
        console.log("Image selection cancelled.");
      }
    } catch (error) {
      Alert.alert('Error', 'A aparut o eroare. Incearca din nou.');
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!selectedImage) {
        Alert.alert('Error', 'Selectati o imagine prima data.');
        return;
      }
  
      const response = await fetch(selectedImage);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser.uid;
      const currentUserDisplayName = currentUser.displayName;
  
      const blob = await response.blob();
  
      const storageRef = storage.ref();
      const imageName = Date.now() + '.jpg';
      const imageRef = storageRef.child('images/' + imageName);
  
      await imageRef.put(blob);
      const downloadURL = await imageRef.getDownloadURL();
  
      await database.ref('Imagini').push({
        imageURL: downloadURL,
        dateAdded: formatDateTime(new Date()),
        user: currentUserUid,
        name: currentUserDisplayName
      });
  
      Alert.alert('Success', 'Imagine adaugata cu success!');
    } catch (error) {
      console.error("Eroare:", error);
      Alert.alert('Error', 'A aparut o eroare. Incearca din nou.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
                  style={styles.button}
                  onPress={handleChooseImage}
              >
                  <Text style={{fontWeight:'bold', fontSize:16}}>Selecteaza o imagine</Text>
              </TouchableOpacity>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <TouchableOpacity
                  style={styles.button}
                  onPress={handleUploadImage}
              >
                  <Text style={{fontWeight:'bold', fontSize:16}}>Incarca imaginea</Text>
              </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 300,
    marginTop: 20,
  },
  button:{
    width: 260,
    marginTop:30,
    height:70,
    backgroundColor:'#FBE698',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
},
});

export default ChatScreen;
