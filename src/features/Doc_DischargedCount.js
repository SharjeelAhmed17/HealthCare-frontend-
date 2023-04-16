import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Doc_DischargedCount : 0
}

export const Doc_DischargedSlice = createSlice({
name : 'Doc_DischargedCounter',
initialState,
reducers :{
    Doc_Discharged : (state, action)=>{
       state.Doc_DischargedCount = action.payload
    }
}
})

export const Doc_DischargedSelect = (state)=>state.Doc_DischargedCounter.Doc_DischargedCount;

export const { Doc_Discharged } = Doc_DischargedSlice.actions;
export default Doc_DischargedSlice.reducer