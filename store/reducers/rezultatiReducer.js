	
/* import { REZULTATI } from "../../data/test-podaci";
import Rjesenja from '../../ekrani/EkranZaKompajliranje'
const pocetnoStanje = {
  rezultati:Rjesenja
}
const rezultatiReducer = (state = pocetnoStanje, action) => {
  return state
}
export default rezultatiReducer */

import { combineReducers } from 'redux'
import dataReducer from './dataReducer'

export default combineReducers({
  svaRjesenja: dataReducer
})