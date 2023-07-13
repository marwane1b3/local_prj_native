import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "../../utils/configureStore";
const initialState = {};
const store = configureStore(initialState);

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <>{children}</>
      </SafeAreaProvider>
    </Provider>
  );
};

export { AppProvider };

const styles = StyleSheet.create({});
