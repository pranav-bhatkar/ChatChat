import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    name: "",
    avatar: "",
    storephone: "",
    };

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
        state.avatar = action.payload;
    },
    setStorePhone: (state, action) => {
      state.storephone = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setAvatar, setStorePhone } = activateSlice.actions;

export default activateSlice.reducer;