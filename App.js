import { StyleSheet, LogBox, View } from 'react-native';
import React from 'react'
import {createStore, combineReducers} from 'redux'
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import store from './store/store'
import RezultatiNavigacija from "./navigacija/navigacija";
import rezultatiReducer from './store/reducers/rezultatiReducer'
import userReducer from './store/reducers/dataReducer'

LogBox.ignoreAllLogs(true);
//enableScreens();
/* const glavniReducer = combineReducers({
  usersList:userReducer
}) */
//const store=createStore(glavniReducer)

export default function App() {
  return (
      <Provider store={store}>
        <RezultatiNavigacija />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


