import React from "react";
//import { ColorPropType, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
//import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from "@expo/vector-icons";

import Kompajler from "../ekrani/EkranZaKompajliranje";
import Rezultati from "../ekrani/EkranZaRezultate";
	
const tabEkrani = {
  Kompajliranje: {
    screen: Kompajler,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return ( <Ionicons name="ios-code" size={15} color={tabInfo.tintColor} /> );
      },
    },
  },
  Rjesenja: {
    screen: Rezultati,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-documents" size={15} color={tabInfo.tintColor} />;
      },
    },
  },
};
  
const RezultatiNavigacija = createBottomTabNavigator(tabEkrani, {
  tabBarOptions: {
    activeBackgroundColor: "#43aa8b",
    inactiveBackgroundColor: "#6d597a",
    activeTintColor: "black",
    inactiveTintColor: "white",
  },
});

export default createAppContainer(RezultatiNavigacija);