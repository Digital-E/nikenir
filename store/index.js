import React, { useReducer, createContext, useEffect } from "react";

const initialState = {
  colour: '',
  message: '',
  progress: 0,
  questionCount: 0
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = state;

    switch (action.type) {
      case "update colour":
        return {
          ...newState,
          colour: action.value
        };      
      case "update message":
        return {
          ...newState,
          message: action.value
        };
      case "update progress":
        return {
          ...newState,
          progress: action.value
        };
      case "update question count":
        return {
          ...newState,
          questionCount: action.value
        };                                            
      default:
        throw new Error();
    }
  }, initialState);


  // useEffect(() => {
  //   Object.keys(initialState).forEach((item) => {
  //     initialState[`${item}`] = JSON.parse(localStorage.getItem(item));
  //   });
  // }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
