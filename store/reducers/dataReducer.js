import {DOHVATI_RJESENJA, GRESKA_RJESENJA} from '../tipovi'

const pocetnoStanje = {
    rjesenja:[],
    loading:true
}

export default function(state = pocetnoStanje, action){
    switch(action.type){
        case DOHVATI_RJESENJA:
            return {
                ...state,
                rjesenja:action.payload,
                loading:false
            }
        case GRESKA_RJESENJA:
            return{
                loading: false, 
                error: action.payload 
            }
        default: return state
    }
}