import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    responsiveSearch: false,
    sideBarToggle: false,
    isMessageModal: false,
    isEmailMessageModal: false,
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
    setEmailMessageModal: (state) => {
      state.isEmailMessageModal = !state.isEmailMessageModal;
    },
  },
});

export const { setResponsiveSearch, toggleSidebar, setSideBarToggle, setMessageModal, setEmailMessageModal } = layoutSlice.actions;
export default layoutSlice.reducer;
