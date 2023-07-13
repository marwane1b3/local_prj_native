import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useInjectReducer, useInjectSaga } from "redux-injectors";
import {
  makeSelectData,
  makeSelectError,
  makeSelectLoading,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { getEndpointCallAction } from "./actions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLabelsContext } from "../../context";
const key = "appContainer";

const stateSelector = createStructuredSelector({
  error: makeSelectError,
  loading: makeSelectLoading,
  user: makeSelectData,
});
const AppContainer = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(stateSelector);

  useEffect(() => {
    dispatch(getEndpointCallAction());
  }, []);

  const loadMoreFunction = () => {
    dispatch(getEndpointCallAction());
  };

  const contextLabels = useLabelsContext();

  const renderItemFunction = ({ item }) =>
    item ? (
      <View style={styles.renderedComponentStyles}>
        <Text style={styles.contentCenteredBodyStyles}>{item}</Text>
      </View>
    ) : null;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.LocalContainerStyles}>
        <Text style={styles.headerStyles}>Reducer data</Text>
        {user && (
          <View style={styles.contentCenteredStyles}>
            <Text style={styles.contentCenteredHeaderStyles}>
              content from reducer :
            </Text>
            <Text style={styles.contentCenteredBodyStyles}>
              {" "}
              {user.activity}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.buttonLoadStyles}
          onPress={loadMoreFunction}
        >
          <Text style={styles.buttonTextLoadStyles}>load more ...</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.LocalContainerStyles,
          { justifyContent: "flex-start", paddingTop: 15 },
        ]}
      >
        <Text style={styles.headerStyles}>context data </Text>

        <View
          style={[
            styles.contentCenteredStyles,
            {
              flex: 1,
            },
          ]}
        >
          <Text style={styles.contentCenteredHeaderStyles}>
            content from context :
          </Text>

          <FlatList
            data={Object.values(contextLabels)}
            renderItem={renderItemFunction}
            contentContainerStyle={styles.flatListContainerStyles}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

    gap: 0.5,
  },
  LocalContainerStyles: {
    flex: 0.4,
    justifyContent: "space-around",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    alignItems: "center",
    width: "90%",
  },
  headerStyles: {
    fontWeight: "bold",
    letterSpacing: 0.6,
  },
  contentCenteredStyles: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentCenteredHeaderStyles: {
    fontWeight: "600",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  contentCenteredBodyStyles: { flexWrap: "wrap", textAlign: "center" },
  buttonLoadStyles: {
    height: 50,
    width: 120,
    elevation: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "blue",
  },
  buttonTextLoadStyles: {
    color: "white",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  flatListContainerStyles: {
    margin: 15,
    paddingBottom: 20,
  },
  renderedComponentStyles: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    paddingVertical: 10,
    marginVertical: 5,
  },
});
