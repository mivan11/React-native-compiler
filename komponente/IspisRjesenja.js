import React, {useEffect} from "react";
import { StyleSheet, View, Dimensions, Text,ScrollView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { DataTable } from 'react-native-paper';

import {dohvatiRezultate} from '../store/actions/dataAction';

const IspisRjesenja = (props) => {
  const dispatch = useDispatch()
  const svaRjesenja = useSelector(state => state.svaRjesenja)
  const {loading, error, rjesenja} = svaRjesenja

  useEffect(() => {
      dispatch(dohvatiRezultate()) 
    }, [dispatch])

  return (
    <>
      <View style={styles.tablica}>
        { //loading ?"Loading...": error ? error.message :
        loading ? <Text>Loading...</Text> : error ? <Text>Greška pri spajanju</Text>:
          <DataTable>
            <View style={styles.tablicaNaslov}>
              <DataTable.Header>
                <DataTable.Title>Kod</DataTable.Title>
              </DataTable.Header>
            </View>
            {rjesenja.map(Rjesenje => {
              return(  
                <View style={styles.tablicaRedak}>
                  <DataTable.Row><Text>{Rjesenje.kod}</Text></DataTable.Row>
                </View>
                )
              })
            }
          </DataTable>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    color:'green',
    alignItems: 'center',
    justifyContent:'center'
  },
  tablica: {
    backgroundColor: '#a8dadc',
    tintColor:'red',
    color:'green',
    borderColor:'white',
    borderWidth:3,
    width: Dimensions.get('window').width,
  },
  tablicaNaslov: {
    borderBottomWidth:3,
    borderBottomColor:'orange',
  },
  tablicaRedak: {
    borderBottomWidth:1,
    fontSize:12
  }
});

export default IspisRjesenja
