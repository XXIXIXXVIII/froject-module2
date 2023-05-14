import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios"
import instance from "../api/axios.client";

export const UserSlice = createSlice({
  name: "user",
  initialState:{username:"",avarta:"", status:"idle", error:null}  
  ,
  reducers:{
    logout:(state)=>{
      state.username= ""
      state.status = "idle"
      state.error=null
      state.avarta=""
    }
  },
  extraReducers: builder =>{
    builder
    .addCase(AxiosAddUser.pending, (state)=>{
        state.status="loading"
        state.error=null
      })
      .addCase(AxiosAddUser.fulfilled,(state,actions)=>{
        state.username= actions.payload.username
        state.status = "succeeded"  
      })
      .addCase(AxiosAddUser.rejected,(state,action)=>{
        state.error = action.error.message
        state.status="idle"
      })

      .addCase(LoginUser.pending,state=>{
        state.status="loading"
        state.error=null
      })
      .addCase(LoginUser.fulfilled,(state, actions)=>{
        state.status = "succeeded" 
        state.username= actions.payload.usernamee
        state.avarta=actions.payload.avarta
        state.error=null
      })
      .addCase(LoginUser.rejected,(state,actions)=>{
        state.status = "idle"
        state.error = actions.error.message        
      })

      .addCase(ChangePassSlice.pending,(state)=>{
        state.error=null
        state.status="loading"
      })
      .addCase(ChangePassSlice.fulfilled,(state)=>{
        state.status = "succeededChangePass"
        state.error=null
      })
      .addCase(ChangePassSlice.rejected,(state,actions)=>{
        state.error = actions.error.message
        state.status = "idle"
      })
      .addCase(ClearState.fulfilled,(state,actions)=>{
        state.status=actions.payload.status
        state.error=actions.payload.error     
      })

      .addCase(CancelMemberSlice.pending,(state)=>{
        state.error=null
        state.status="loading"
      })
      .addCase(CancelMemberSlice.fulfilled,(state)=>{
        state.error=null
        state.status="succeededCancel"
        state.username=""
      })
      .addCase(CancelMemberSlice.rejected,(state,actions)=>{
        state.error=actions.error.message
        state.status="fail"
      })

      .addCase(AddAvarta.pending,state=>{
        state.status="loading"
        state.error=null
      })
      .addCase(AddAvarta.fulfilled,(state,actions)=>{
        state.avarta=actions.payload
        state.status="successAddavarta"
      })
      .addCase(AddAvarta.rejected,(state, actions)=>{
        state.error = actions.error.message
        state.status="fait"
      })
   
      
  }
})

export const AxiosAddUser = createAsyncThunk("user/axiosAddUser", async(user)=>{
  try {
    const res = await axios.post("http://localhost:8080/user/signup",user)
    return res.data
  } catch (error) {
    throw new Error( error.response.data.message)
  }
  }
)

export const LoginUser = createAsyncThunk("user/login", async(user)=>{
  try {
    const res = await axios.post("http://localhost:8080/user/login", user)

    return res.data
  } catch (error) {

    throw new Error( error.response.data.message)
  }
})

export const ChangePassSlice = createAsyncThunk("user/changepass", async({oldPass,newPass,repeatNewPass, username})=>{
  try {
    const res = await instance.post("/user/changepass",{oldPass,newPass,repeatNewPass, username})
    console.log(res)
  } catch (error) {
    throw new Error(error.response.data.message||error.message)
  }
})

export const ClearState = createAsyncThunk("user/clear",()=>{
  let clear = {status:"idle", error:null}
  return clear
} )

export const CancelMemberSlice = createAsyncThunk("user/cancelmember",async({pass, username})=>{
  console.log(pass, username)
  try {
    let result = await instance.post("/user/cancelmember", {pass, username})
    console.log(result)
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})

export const AddAvarta = createAsyncThunk("user/addavarta", async({username, urlImg})=>{
  try {
    let result = await instance.post("/user/postavarta",{urlImg, username})
    return result.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})

export const { logout } = UserSlice.actions;
export default UserSlice.reducer