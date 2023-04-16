import { configureStore } from '@reduxjs/toolkit';
import  Hop_OPDReducer from '../features/Hop_OPCount';
import Hop_ICUReducer  from '../features/Hop_ICUCount';
import Hop_DischargedReducer  from '../features/Hop_DischargedCount';
import Doc_OPDReducer  from '../features/Doc_OPDCount';
import Doc_ICUReducer  from '../features/Doc_ICUCount';
import Doc_DischargedReducer  from '../features/Doc_DischargedCount';

export const store = configureStore({
    reducer:{
        Hop_OPDCounter : Hop_OPDReducer,
        Hop_ICUCounter : Hop_ICUReducer,
        Hop_DischargedCounter : Hop_DischargedReducer,
        Doc_OPDCounter : Doc_OPDReducer,
        Doc_ICUCounter : Doc_ICUReducer,
        Doc_DischargedCounter : Doc_DischargedReducer
        
    }
})