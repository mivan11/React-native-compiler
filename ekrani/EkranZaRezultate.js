import React from "react";
import { StyleSheet, View, Button, Text, Platform, ScrollView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import IspisRjesenja from '../komponente/IspisRjesenja'
import kodoviServer from '../servisi/kodovi';

const EkranZaRezultate = () => {
  const izbrisiRjesenja = (e) => {
    e.preventDefault()
    kodoviServer
    .izbrisi()
    .then(res=>{
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tablica}>  
        <Text>
          <IspisRjesenja/ >
        </Text>
       </ScrollView> 
      <Ionicons 
        name="ios-trash" 
        size={35} 
        onPress={izbrisiRjesenja}
        color='white'
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#023047': '#6B705C',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  button:
  {
    backgroundColor: '#2A9D8F',
    color:'white',
  },
  tablica: {
    marginTop:35,
    marginBottom:20,
    borderColor:'white',
    borderWidth:3,
    borderBottomColor:'white'
  }
});

export default EkranZaRezultate
