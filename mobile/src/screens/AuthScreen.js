import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signUpWithPhonePassword, signInWithPhonePassword } from '../services/firebase';

export default function AuthScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    try {
      await signUpWithPhonePassword(phone, password);
      navigation.replace('Map');
    } catch (e) {
      Alert.alert('Erreur', e.message);
    }
  };

  const onSignIn = async () => {
    try {
      await signInWithPhonePassword(phone, password);
      navigation.replace('Map');
    } catch (e) {
      Alert.alert('Erreur', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KONTIN NSINGA</Text>
      <TextInput placeholder="Téléphone (+243...)" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Se connecter" onPress={onSignIn} />
      <View style={{height:10}} />
      <Button title="S'inscrire" onPress={onSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  title: { fontSize:24, fontWeight:'bold', textAlign:'center', marginBottom:20 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:10, borderRadius:6 }
});
