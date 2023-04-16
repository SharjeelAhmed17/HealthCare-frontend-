import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Hop_OPDCount : 0
}

export const Hop_OPDSlice = createSlice({
name : 'Hop_OPDCounter',
initialState,
reducers :{
    Hop_OPD : (state, action)=>{
       state.Hop_OPDCount = action.payload
    }
}
})

export const Hop_OPDSelect = (state)=>state.Hop_OPDCounter.Hop_OPDCount;

export const { Hop_OPD } = Hop_OPDSlice.actions;
export default Hop_OPDSlice.reducer