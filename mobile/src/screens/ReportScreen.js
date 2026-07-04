import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { createIncident } from '../services/firebase';

export default function ReportScreen({ navigation }) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState(null);

  const pickImage = async ()=>{
    const result = await ImagePicker.launchCameraAsync({ quality:0.6, mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.cancelled) setMedia(result.uri);
  };

  const onSubmit = async ()=>{
    try{
      const location = await Location.getCurrentPositionAsync({});
      await createIncident({ type, description, mediaUri: media, location });
      Alert.alert('Merci', 'Signalement envoyé');
      navigation.goBack();
    }catch(e){
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type</Text>
      <TextInput value={type} onChangeText={setType} style={styles.input} />
      <Text style={styles.label}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={[styles.input,{height:100}]} multiline />
      <Button title="Prendre une photo" onPress={pickImage} />
      {media ? <Image source={{uri:media}} style={{width:200,height:200,marginTop:10}} /> : null}
      <View style={{height:10}} />
      <Button title="Envoyer" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, borderRadius:6, marginBottom:10 },
  label:{ fontWeight:'bold', marginBottom:6 }
});
