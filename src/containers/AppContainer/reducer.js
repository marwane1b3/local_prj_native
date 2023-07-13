import { produce } from "immer";
import {
  GET_ENDPOINT_CALL_ACTION,
  GET_ENDPOINT_CALL_ACTION_SUCCESS,
  GET_ENDPOINT_CALL_ACTION_FAIL,
} from "./constants";

export const initialState = {
  data: {},
  loading: false,
  error: false,
};

const AppContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_ENDPOINT_CALL_ACTION:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_ENDPOINT_CALL_ACTION_SUCCESS:
      draft.error = false;
      draft.loading = false;
      draft.data = action.payload;
      break;
    case GET_ENDPOINT_CALL_ACTION_FAIL:
      draft.error = true;
      draft.loading = false;
      break;
  }
}, initialState);

export default AppContainerReducer;
