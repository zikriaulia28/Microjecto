const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  toggleMenu: false,
};

const toggleSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleToggel: (prevState) => {
      const infoToggle = prevState.toggleMenu;
      return { ...prevState, toggleMenu: !infoToggle };
    },
    resetToggle: () => {
      return initialState;
    },
  },
});

export const toggleAction = { ...toggleSlice.actions };
export default toggleSlice.reducer;