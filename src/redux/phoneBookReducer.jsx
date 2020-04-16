import { createReducer } from "@reduxjs/toolkit";
import { updateFilter, addContact, deleteContact } from "./phoneBookActions";

const initialStore = {
  contacts: [],
  filter: "",
};

export const phoneBookReducer = createReducer(initialStore, {
  [updateFilter]: (state, action) => {
    const { payload } = action;
    state.filter = payload;
  },
  [addContact]: (state, action) => {
    const { payload } = action;
    state.contacts.push(payload);
  },
  [deleteContact]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      contacts: state.contacts.filter((contact) => contact.id !== payload),
    };
  },
});
