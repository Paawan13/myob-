import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  Name: String | null;
  Color: String | null;
}
const initialState: State = {
  Name: null,
  Color: null,
};

const collectionNameSlice = createSlice({
  name: 'chatBot',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<String>) => {
      state.Name = action.payload
    },
    setColor: (state, action: PayloadAction<String>) => {
      state.Color = action.payload
    }
  },

});

export const { setName, setColor } = collectionNameSlice.actions;
export default collectionNameSlice.reducer;
