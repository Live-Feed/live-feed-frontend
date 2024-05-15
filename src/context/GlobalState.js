import React, {createContext, useReducer, useContext } from "react";

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const initialState = {
  isNew: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_NEW':
      return {
        ...state,
        isNew: action.payload
      };
    default:
      return state;
  }
};

export const GlobalProvider = ( {children} ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);