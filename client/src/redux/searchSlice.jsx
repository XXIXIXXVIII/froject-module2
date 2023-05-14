import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios.client";

export const searchSlice = createSlice({
  name: "search",
  initialState:{ data:[],searchkey:"",mediaType:"", status:"idle", err:null},
  reducers:{},
  extraReducers: builder =>{
    builder
    .addCase(searchData.pending,(state)=>{
      state.status="loading"
    })
    .addCase(searchData.fulfilled,(state,action)=>{
      state.status="idle"
      state.data=action.payload.data
      state.searchkey=action.payload.searchkey
      state.mediaType=action.payload.mediaType
    })
  }


})

export const searchData = createAsyncThunk("search/searchData",async({search, mediaType})=>{
  try {
    const data = await instance.get(`${mediaType}/search?query=${search}&page=1`)
    data.searchkey = search
    data.mediaType = mediaType
    return data

  } catch (error) {
    console.log(error)
  }
})

export default searchSlice.reducer
