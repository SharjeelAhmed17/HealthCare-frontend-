import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Doc_ICUCount : 0
}

export const Doc_ICUSlice = createSlice({
name : 'Doc_ICUCounter',
initialState,
reducers :{
    Doc_ICU : (state, action)=>{
       state.Doc_ICUCount = action.payload
    }
}
})

export const Doc_ICUSelect = (state)=>state.Doc_ICUCounter.Doc_ICUCount;

export const { Doc_ICU } = Doc_ICUSlice.actions;
export default Doc_ICUSlice.reducer