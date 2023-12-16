import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await fetch(
      'https://657cc619853beeefdb99f3c6.mockapi.io/vlasark/contacts'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
});

const ContactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      // state.items = [...state.items];
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact, updateFilter } = ContactSlice.actions;
export default ContactSlice.reducer;
