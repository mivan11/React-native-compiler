import {DOHVATI_RJESENJA, GRESKA_RJESENJA} from '../tipovi'
import axios from 'axios'

/*  var ip = require("ip");
const ipAdresa=ip.address();
console.log ( ipAdresa );  */

/* import os from 'os';
function getIPAddress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
  
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
          return alias.address;
      }
    }
    return '0.0.0.0';
  }
  var ipAdresa = getIPAddress().toString(); */

import publicIP from 'react-native-public-ip';

publicIP()
  .then(ip => {
    console.log(ip);

  })
  .catch(error => {
    console.log(error);
    // 'Unable to get IP address.'
  });
const IPAdresa='192.168.5.76'

export const dohvatiRezultate = () => async dispatch => {
    try{
       /*let ipAdresa="";
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            console.log(add);
            ipAdresa=add;
        })*/
        //const res = await axios.get(`http://192.168.5.75:3001/api/Kodovi`)
        const res = await axios.get(`http://192.168.5.75:3001/api/Kodovi`)
        dispatch( {
            type: DOHVATI_RJESENJA,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: GRESKA_RJESENJA,
            payload: error,
        })
    }
}