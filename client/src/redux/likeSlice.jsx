import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/axios.client";

const likeSlice = createSlice({
  name:"like",
  initialState:{ status:"idle", err:null, dataList:[]},
  reducers:{},
  extraReducers: builder=>{
    builder
    .addCase(getLike.pending,(state)=>{
      state.status = "loading"
    })
    .addCase(getLike.fulfilled,(state,action)=>{
      state.status = "idle"
      state.dataList=action.payload
    })
    .addCase(removeLike.pending,(state)=>{
      state.status="loading"
    })
    .addCase(removeLike.fulfilled,(state,action)=>{
      state.status=action.payload
    })
  }
})

export const addLike = createAsyncThunk("like/addLike",async({mediaType, mediaId, username,mediaImg})=>{
  try {
    console.log(mediaType, mediaId, username,mediaImg)
    const res = await instance.post("/like/post", {mediaType, mediaId, username,mediaImg})
    return res
  } catch (error) {
    return error.message
  }
})

export const getLike = createAsyncThunk("like/getLike",async({username})=>{
  try {
    const res= await instance.post("/like/get",{username})
    return res.data
  } catch (error) {
    return error.message
  }
})

export const removeLike = createAsyncThunk("like/removeLike",async ({username,mediaId})=>{
  try {
    console.log(mediaId)
    const res = await instance.post("/like/remove",{username,mediaId})
    console.log(res)
    return res.statusText
  } catch (error) {
    return error.message
  }
})



export default likeSlice.reducer