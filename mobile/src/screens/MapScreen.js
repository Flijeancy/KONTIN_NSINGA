import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { listenIncidents } from '../services/firebase';

export default function MapScreen({ navigation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const unsub = listenIncidents((data)=>{
      setIncidents(data);
    });
    return () => unsub && unsub();
  },[]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude: -4.4419, longitude: 15.2663, latitudeDelta: 0.1, longitudeDelta: 0.1 }}>
        {incidents.map(i=> (
          <Marker key={i.id} coordinate={{ latitude: i.location.lat, longitude: i.location.lng }} title={i.type} description={i.description} />
        ))}
      </MapView>
      <View style={styles.fab}>
        <Button title="Signaler" onPress={()=>navigation.navigate('Report')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1 },
  map:{ flex:1 },
  fab:{ position:'absolute', right:10, bottom:20 }
});
