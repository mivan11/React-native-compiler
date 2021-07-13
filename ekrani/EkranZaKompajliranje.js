import { StyleSheet, Text, View, TextInput, Button, ScrollView, Platform,Dimensions, Alert, ColorPropType} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNPickerSelect from "react-native-picker-select";
import { RadioButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import {useDispatch, useSelector} from 'react-redux'

import kodoviServer from '../servisi/kodovi';
import ZadnjeRjesenje from '../komponente/ZadnjeRjesenje';
import {dohvatiRezultate} from '../store/actions/dataAction'

import { color } from 'react-native-reanimated';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const EkranZaKompajliranje = (props) => {
  const [data, postaviUnos] = useState ([])
  const [Kod, postaviKod] = useState('')
  const [Inputi, postaviInpute] = useState('')
  const [Rezultati, postaviRezultate] = useState('')
  const [InputRadio, postaviInputRadio] = useState('')
  const [Lang, postaviLang] = useState('')
  const [zadnje, postaviZadnje] = useState(false)
  
  const promjenaRezultata = (e) => {
    postaviRezultate(e.target.value)
  }

  const kompajlirajSve = (e) => {
    e.preventDefault()
    const noviKod = {
      id: -1,
      kod: Kod,
      inputi: Inputi,
      lang: Lang,
      inputRadio: InputRadio,
      rezultati:"",
    }
    kodoviServer
    .stvori(noviKod)
    .then(res=>{
      postaviRezultate(res.data.toString())
    })
  }

  const dodajNovi = (e) => {
    e.preventDefault()
    const noviKod = {
      id: data.length + 1,
      kod: Kod,
      inputi: Inputi,
      lang: Lang,
      inputRadio: InputRadio,
      rezultati: Rezultati,
    }
 
    kodoviServer
    .stvori(noviKod)
    .then(res=>{
      //postaviUnos(data.concat(noviKod))
      postaviKod('')
      postaviInpute('')
      postaviLang('')
      postaviInputRadio('')
      postaviRezultate('')
      //postaviRezultate(res.data.toString())
      console.log(noviKod.rezultati)
      //console.log(res.data.toString())
    }) 
  }

  const dohvatiRjesenja = (e) => {
    e.preventDefault()
    postaviZadnje(true)
  }

  const sakrijRjesenja = (e) => {
    e.preventDefault()
    postaviZadnje(false)
  }

  const dispatch = useDispatch()
  const svaRjesenja = useSelector(state => state.svaRjesenja)
  const {loading, error, rjesenja} = svaRjesenja

  useEffect(() => {
      dispatch(dohvatiRezultate()) 
    }, [dispatch])
    //const zadnji = rjesenja.length-1
    
  return (
    <View style={styles.container}>
      <View style={styles.apsolutno}>
        <ScrollView style={styles.textAreaKod}>
          <TextInput
            color="black"
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={11}
            multiline={true} 
            value={Kod} 
            onChangeText={postaviKod} 
            placeholder="Dodaj kod"
          />
        </ScrollView>
        <View style={styles.textAreaInput}>
          <TextInput
            color="black"
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={4}
            multiline={true} 
            value={Inputi}  
            onChangeText={postaviInpute} 
            placeholder="Dodaj inpute"
          />
        </View>

        <View style={styles.rnpPickerSelect}>
          <RNPickerSelect style={ color='red' }
            onValueChange={(Lang) => postaviLang(Lang)}
            items={ [
                { label: "Python", value: "Python", name:"Python"},
                { label: "C", value: "C"},
            ] 
          }
          />
        </View>

        <View style={styles.radioButtons}>
          <Text style={styles.tekst}>Kompajliranje s inputima:</Text>
          <View style={styles.radioButton}>
            <RadioButton
              title="Da"
              value="true"
              status={ InputRadio === 'true' ? 'checked' : 'unchecked' }
              //onPress={() => promjenaInputRadio()}
              onPress={() => postaviInputRadio('true')}/><Text>Da</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="false"
              status={ InputRadio === 'false' ? 'checked' : 'unchecked' }
              onPress={() => postaviInputRadio('false')}
            /><Text>Ne</Text>
          </View>
        </View>

        <View style={styles.kompajliraj}>
          <Button  
            title="Kompajliraj"
            onPress={kompajlirajSve}
            color='#9a031e'
          />
        </View>

        <View style={styles.textAreaRezultat}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={6}
            multiline={true} 
            value={Rezultati} 
            onChangeText={promjenaRezultata}
          />
        </View>
        {/*<View style={styles.ikona}>
            <Ionicons 
              name="ios-save" 
              size={30} 
              onPress={dodajNovi}
              color='#ede0d4'
            /> 
          </View> */}
        <View style={styles.botuniRjesenja}>
          <View style={styles.botuni}>
            <Button 
              title="Prikaži"
              onPress={dohvatiRjesenja}
              color='#9a031e'
              /*    onPress={() => {
                    postaviZadnje({ zadnje: true });
                  }} */
            />
          </View>
          <View style={styles.ikona}>
            <Ionicons 
              name="ios-save" 
              size={30} 
              onPress={dodajNovi}
              color='#ede0d4'
            /> 
          </View>
          {/*<View style={styles.botuni}>
            <Button 
              title="Sakrij"
              onPress={sakrijRjesenja}
              color='#9a031e'
            />
          </View> */}
        </View>
      </View>
      <View style={styles.dialog}>
        <Dialog
          visible={zadnje}
          onTouchOutside={() => {
            postaviZadnje({ zadnje: false });
          }}

          footer={
            <DialogFooter>
              <DialogButton
                text="OK"
                onPress={sakrijRjesenja}
              /*  onPress={() => {postaviZadnje(false)}} */
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            {loading ? <Text>Loading...</Text> : error ? <Text>Greška</Text>:
              rjesenja.map((element, index) => {
                //Last element
                if (index === rjesenja.length - 1) {
                  return <Text>{element.kod}</Text>;
                  //return `${element.kod}`;
                }
              }         
              ) 
            }
          </DialogContent>
        </Dialog>
      </View>
      <View style={styles.zadnje}>
        {zadnje === true ? <Text><ZadnjeRjesenje/></Text>: <Text></Text> }     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#023047': '#6B705C',
    color:'white',
  },
  apsolutno:{
  },
  textAreaKod: {
    backgroundColor: '#a8dadc',
    color:'black',
    margin:2,
    borderColor:'white',
    borderWidth:3,
    marginTop:35,
  },
  textAreaInput: {
    backgroundColor: '#a8dadc',
    color:'white',
    margin:2,
    borderColor:'white',
    borderWidth:3,
  },
  textAreaRezultat: {
    backgroundColor: '#a8dadc',
    color:'#545F66',
    margin:2,
    borderColor:'white',
    borderWidth:3,
  },
  rnpPickerSelect: {
    backgroundColor: '#8d99ae',
    color:'#545F66',
    margin:2,
    borderColor:'white',
    borderWidth:3,
  }, 
  radioButtons: {
    margin:2,
    backgroundColor:'#8d99ae',
    borderColor:'white',
    borderWidth:3,
  }, 
  tekst: {
    margin:5,
    fontSize:12,
    color:'white'
  },
  radioButton: {
    width: Dimensions.get('window').width,
    shadowColor :'white',
    flexDirection:'row', 
    alignItems:'center'
  }, 
  kompajliraj: {
    justifyContent:'center',
    alignItems:'center',
    margin:2
  }, 
  ikona:{
    justifyContent:'center',
    alignItems:'center'
  },
  zadnje:{
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    color:'white'
  },
  botuniRjesenja: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems:'center',
    paddingHorizontal: 15,
    color:'black'
  },
  botuni: {
    color:"black",
    justifyContent:"center",
    alignItems:'center',
    margin:2
  }, 
  dialog:{
    width: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  }
});

export default EkranZaKompajliranje