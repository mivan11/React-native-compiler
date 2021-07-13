import axios from 'axios'
import publicIP from 'react-native-public-ip';

/*  var ip = require("ip");
const ipAdresa=ip.address();
console.log ( ipAdresa );*/
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
  } */
/* var ipAdresa="";
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log(add);
    ipAdresa=add;
  }) */

//const osnovniUrl = 'http://192.168.5.75:3001/api/Kodovi'
const osnovniUrl = 'http://192.168.5.75:3001/api/Kodovi'
//const osnovniUrl = '/api/Kodovi'

const dohvati = () => {
    return axios.get(osnovniUrl);
}

const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}

const izbrisi = () => {
    return axios.delete(osnovniUrl);
}

export default {
    dohvati: dohvati,
    stvori: stvori,
    izbrisi: izbrisi,
}
