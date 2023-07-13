import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { GET_ENDPOINT_CALL_ACTION } from "./constants";
import {
  getEndpointCallActionSuccess,
  getEndpointCallActionFail,
} from "./actions";
import { makeSelectData } from "./selectors";
function* getEndPointGenerator() {
  try {
    console.log("inside saga");

    // pour state selection inside saga point fort inter-conponents .

    const data = yield select(makeSelectData);

    console.log(data);

    // faire apelle api  inside saga point fort tu garde la meme method d'apelle inside call function .

    const reponse = yield call(async () => {
      const res = await fetch(`https://www.boredapi.com/api/activity`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((body) => {
          return body;
        });

      return res;
    });

    // check result ::
    if (reponse) {
      yield put(getEndpointCallActionSuccess(reponse));
    }
  } catch (error) {
    console.log("@@error :: ", error);
  }
}

export default function* getEndpointCallEntry() {
  // dans  cette fonction default le point d'entrer .
  // takelatest prend action type et generator function a executer l'ors de l'apelle a cette action .
  // on peux avoir more takelatest dans lentry point
  // check index.js
  yield takeLatest(GET_ENDPOINT_CALL_ACTION, getEndPointGenerator);
}
