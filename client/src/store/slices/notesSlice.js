import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note._id !== action.payload);
    },
  },
});

export const { setNotes, addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;