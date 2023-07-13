import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AppProvider } from "./src/providers/AppProvider";
import AppContainer from "./src/containers/AppContainer";
import TextLabels from "./src/context";
export default function App() {
  return (
    <AppProvider>
      <TextLabels>
        <AppContainer />
      </TextLabels>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
