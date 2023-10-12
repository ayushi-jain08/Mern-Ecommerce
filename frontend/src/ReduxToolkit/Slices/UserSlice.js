import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { json } from 'react-router-dom';

export const fetchRegister = createAsyncThunk("data/fetchRegister", async({name, email, mobile, work, password, pic}) => {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("work", work)
    formData.append("password", password)
    formData.append("photo", pic)
    try {
    const response = await fetch("http://localhost:6001/api/register", {
        method: "POST",
        mode: "cors",
      "Content-Type": "multipart/form-data",
        body: formData
    })
    const data = await response.json()
    if(response.ok){
        localStorage.setItem("userDataInfo", JSON.stringify(data))
        return data
    }else{
        throw new Error(data.message)
    }
    } catch (error) {
        throw new Error("An error occurred while processing your request.");
    }
})
// ===================USER LOGIN===================
export const fetchLogin = createAsyncThunk("data/fetchLogin", async({email,password}) =>{
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
  try {
    const response = await fetch("http://localhost:6001/api/signin", {
        method: "POST",
        mode: 'cors',
        "Content-Type": "multipart/form-data",
        body: formData
    })
    const data = response.json()
    if(response.ok){
        localStorage.setItem("userDataInfo", JSON.stringify(data))
        return data
    }else{
        throw new Error(data.message)
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// =======================USER DATA=========================
export const fetchUserData = createAsyncThunk('data/,fetchUserData', async(_,thunkAPI) => {
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("userDataInfo")
          );
        const response = await fetch("http://localhost:6001/api/abouts", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${StoredUserInfo.token}`,
              },
        })
        const data = await response.json();
        if (response.ok) {
          return data; // This data will be passed to the fulfilled action
        } else {
          throw new Error(data.message);
        }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})

// ======================LOGOUT========================
export const fetchLogout = createAsyncThunk('data/fetchLogout', async() => {
    localStorage.removeItem("userDataInfo")
    return null
})
// ==========================CONTACT US FORM=============================
export const FetchContactUs = createAsyncThunk("data/FetchContactUs", async({name, email, message, userId}) => {
    try {
        const StoredUserInfo = JSON.parse(
            localStorage.getItem("userDataInfo")
          );
        const response = await fetch("http://localhost:6001/api/contact", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${StoredUserInfo.token}`,
              },
              body: JSON.stringify({name, email,message,userId})
        })
        const data = await response.json();
        if (response.ok) {
          return data.message // This data will be passed to the fulfilled action
        } else {
          throw new Error(data.message);
        }
    } catch (error) {
        throw new Error("An error occurred while processing your request.");
    }
})
const infoStorage = () => {
    const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"))
    if(StorageUserInfo){
        return StorageUserInfo
    }
    return null;
}
const initialState = {
    userInfo: infoStorage() || [],
    loading: false,
    error: null,
    loggedIn: false,
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            state.loggedIn = true;
            localStorage.setItem("userDataInfo", JSON.stringify(action.payload));
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRegister.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchRegister.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(fetchRegister.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(fetchLogin.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchLogin.fulfilled, (state,action) => {
            state.loading = false
           state.userInfo = action.payload
           state.loggedIn = true;
           localStorage.setItem("userDataInfo", JSON.stringify(action.payload));
        })
        .addCase(fetchLogin.rejected, (state,action) => {
            state.loading = false
            state.error = action.error.message
            state.loggedIn = false;
        })
        .addCase(fetchUserData.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchUserData.fulfilled, (state,action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.loggedIn = true;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
            state.loggedIn = false;
        })
        .addCase(fetchLogout.pending, (state) => {
            state.loading = true;
           state.error = false
        })
        .addCase(fetchLogout.fulfilled, (state,action) => {
            state.loading = false;
            state.userInfo = " ";
            state.loggedIn = false;
            localStorage.removeItem("userDataInfo")
        })
        .addCase(fetchLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        


    }
})



export const {setUserInfo} = UserSlice.actions
export default UserSlice.reducer