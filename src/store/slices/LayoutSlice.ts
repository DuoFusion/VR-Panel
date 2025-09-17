import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    responsiveSearch: false,
    sideBarToggle: false,
    isMessageModal: false,
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
    setMessageModal: (state) => {
      state.isMessageModal = !state.isMessageModal;
    },
  },
});

export const { setResponsiveSearch, toggleSidebar, setSideBarToggle, setMessageModal } = layoutSlice.actions;
export default layoutSlice.reducer;
