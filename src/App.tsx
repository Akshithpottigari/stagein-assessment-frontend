import { useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import StoriesContainer from "./components/StoriesContainer";
import { AppContext } from "./contexts/AppContext";
import { reducerFn } from "./reducers";
import { getInitState } from "./reducers/getInitState";
import { Portal } from "./portals/Portal";
import { StoryPortal } from "./portals/StoryPortal";
import UserProvider from "./contexts/UsersContext";

function App() {
  const [state, dispatch] = useReducer(reducerFn, getInitState());
  const globalState = {
    ...state,
    dispatch,
  };

  return (
    <AppContext.Provider value={globalState}>
      <UserProvider>
        <div className="min-h-screen w-full bg-white">
          <section className="w-full p-5">
            <Header />
            <StoriesContainer />
          </section>
          <Portal>
            <StoryPortal />
          </Portal>
        </div>
      </UserProvider>
    </AppContext.Provider>
  );
}

export default App;
