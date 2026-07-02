import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({

  name: "query",
  initialState: {
    songs: []
  },

  reducers: {
    setSongs: (
      state,
      action
    ) => {
      state.songs =
        action.payload;
    }
  }
});


export const {
  setSongs
} = querySlice.actions;

export default querySlice.reducer;