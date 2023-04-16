import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Doc_OPDCount : 0
}

export const Doc_OPDSlice = createSlice({
name : 'Doc_OPDCounter',
initialState,
reducers :{
    Doc_OPD : (state, action)=>{
       state.Doc_OPDCount = action.payload
    }
}
})

export const Doc_OPDSelect = (state)=>state.Doc_OPDCounter.Doc_OPDCount;

export const { Doc_OPD } = Doc_OPDSlice.actions;
export default Doc_OPDSlice.reducer