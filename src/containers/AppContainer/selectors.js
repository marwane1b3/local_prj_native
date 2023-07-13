import { createSelector } from 'reselect';
import { initialState } from './reducer';



const selectAuthScreenDomain = (state) => state.appContainer || initialState;


const makeSelectDefault =
    createSelector(selectAuthScreenDomain, substate => substate);
const makeSelectLoading = createSelector(
    selectAuthScreenDomain,
    substate => substate.loading,
);
const makeSelectError = createSelector(
    selectAuthScreenDomain,
    substate => substate.error,
);
const makeSelectData = createSelector(
    selectAuthScreenDomain,
    substate => substate.data,
);


export default makeSelectDefault;
export {
    selectAuthScreenDomain,
    makeSelectError,
    makeSelectLoading,
    makeSelectData,

};
