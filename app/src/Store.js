import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();
const store = configureStore({ reducer: rootReducer, preloadedState: persistedState });
store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle errors while persisting the state
  }
});

export default store;
