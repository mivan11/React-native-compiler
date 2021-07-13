import React, {useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Dimensions} from 'react-native';
//import {Table, Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'

import {dohvatiRezultate} from '../store/actions/dataAction'

const ZadnjeRjesenje = (props) => {
  const dispatch = useDispatch()
  const svaRjesenja = useSelector(state => state.svaRjesenja)
  const {loading, error, rjesenja} = svaRjesenja
  
  useEffect(() => {
      dispatch(dohvatiRezultate()) 
    }, [dispatch])
    //const zadnji = rjesenja.length-1

  return (
    <>
      <ScrollView style={styles.posljednje}>
        {loading ? <Text>"Loading..."</Text> : <Text>{error}</Text> ? <Text>Greška</Text>://error.message : 
          rjesenja.map((element, index) => {
            //Last element
            if (index === rjesenja.length - 1) {
              return <Text>{element.kod}</Text>;
            }
          })
        }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  posljednje: {
    flex: 1,
    color:'white'
  }
})

export default ZadnjeRjesenje