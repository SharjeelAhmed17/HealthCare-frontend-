import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Hop_ICUCount : 0
}

export const Hop_ICUSlice = createSlice({
name : 'Hop_ICUCounter',
initialState,
reducers :{
    Hop_ICU : (state, action)=>{
       state.Hop_ICUCount = action.payload
    }
}
})

export const Hop_ICUSelect = (state)=>state.Hop_ICUCounter.Hop_ICUCount;

export const { Hop_ICU } = Hop_ICUSlice.actions;
export default Hop_ICUSlice.reducer