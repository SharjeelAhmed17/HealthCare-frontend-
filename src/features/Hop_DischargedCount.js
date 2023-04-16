import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Hop_DischargedCount : 0
}

export const Hop_DischargedSlice = createSlice({
name : 'Hop_DischargedCounter',
initialState,
reducers :{
    Hop_Discharged : (state, action)=>{
       state.Hop_DischargedCount = action.payload
    }
}
})

export const Hop_DischargedSelect = (state)=>state.Hop_DischargedCounter.Hop_DischargedCount;

export const { Hop_Discharged } = Hop_DischargedSlice.actions;
export default Hop_DischargedSlice.reducer