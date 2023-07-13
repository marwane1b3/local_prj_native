import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import defaultLabels from "../utils/labels";

import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from "../containers/AppContainer/selectors";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";
const stateSelector = createStructuredSelector({
  error: makeSelectError,
  loading: makeSelectLoading,
  dataParsed: makeSelectData,
});
const LabelContext = createContext();

const TextLabels = ({ children }) => {
  const { error, dataParsed, loading } = useSelector(stateSelector);
  const [Labels, setLabels] = useState(defaultLabels);
  const index = useRef(0);

  const reloadContexedDataFunction = () => {
    index.current++;
    setLabels((prev) => ({
      ...prev,
      [`title ${index.current}`]: dataParsed?.activity,
    }));
  };

  useEffect(() => {
    if (!error && !loading) reloadContexedDataFunction();
  }, [dataParsed, error]);

  return (
    <LabelContext.Provider value={Labels}>{children}</LabelContext.Provider>
  );
};

export default TextLabels;

export const useLabelsContext = () => useContext(LabelContext);
