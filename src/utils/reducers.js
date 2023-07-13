import { combineReducers } from "redux";

import { produce } from "immer";

const initialState = {
  locale: "",
};

const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case true:
      draft.locale = action.locale;
      break;
  }
}, initialState);

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,

    ...injectedReducers,
  });
  return rootReducer;
}
