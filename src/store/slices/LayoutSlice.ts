import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    responsiveSearch: false,
    sideBarToggle: false,
  },
  reducers: {
    setResponsiveSearch: (state) => {
      state.responsiveSearch = !state.responsiveSearch;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    toggleSidebar: (state) => {
      state.sideBarToggle = !state.sideBarToggle;
    },
  },
});

export const { setResponsiveSearch, toggleSidebar, setSideBarToggle } = layoutSlice.actions;
export default layoutSlice.reducer;
