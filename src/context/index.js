import React, { createContext, useContext, useEffect, useState } from "react";
import defaultLabels from "../utils/labels";

import {
  makeSelectData,
  makeSelectError,
} from "../containers/AppContainer/selectors";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";
const stateSelector = createStructuredSelector({
  error: makeSelectError,

  dataParsed: makeSelectData,
});
const LabelContext = createContext();

const TextLabels = ({ children }) => {
  const { error, dataParsed } = useSelector(stateSelector);
  const [Labels, setLabels] = useState(defaultLabels);

  const reloadContexedDataFunction = () => {
    const localObject = {
      title: dataParsed?.activity,
    };
    setLabels((prev) => ({ ...prev, ...localObject }));
  };

  useEffect(() => {
    reloadContexedDataFunction();
  }, [dataParsed, error]);

  return (
    <LabelContext.Provider value={Labels}>{children}</LabelContext.Provider>
  );
};

export default TextLabels;

export const useLabelsContext = () => useContext(LabelContext);
