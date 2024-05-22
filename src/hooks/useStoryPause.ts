import { useContext, useEffect, useReducer, useState } from "react";
import {
  AppContextInterface,
  StoriesContextInterface,
  UsersInterface,
  startStoryTransitionProps,
} from "../types";
import { AppContext } from "../contexts/AppContext";
import { getInitialValue } from "../reducers/getInitValue";
import { STORIES_REDUCER_TYPES } from "../enums";
import { getCurrentStory } from "../lib/utils";
import { storiesReducer } from "../reducers/storyReducer";
import { UserContext } from "../contexts/UsersContext";

export const useStoryPause = () => {
  const {
    dispatch,
    modal: { userId, userName },
  } = useContext(AppContext) as AppContextInterface;
  const { users, loading, error, stories } = useContext(UserContext);
  const [inPause, setInPause] = useState<boolean>(false);
  const initialStories = stories[userId].stories;
  const storiesInitialValue = getInitialValue(initialStories, userId);

  const [storiesState, storiesDispatch] = useReducer(
    storiesReducer,
    storiesInitialValue
  );
  const storiesStateInitialValue = {
    ...(storiesState as StoriesContextInterface),
    storiesDispatch,
  };

  const { timing, currentStories, currentStory } = storiesState;
  const { currentStoryIndex } = getCurrentStory(currentStories, currentStory);

  const storyTransitionConfig: startStoryTransitionProps = {
    userId,
    storiesDispatch,
    dispatch,
    currentStories,
    currentStoryIndex,
    timing,
    inPause,
    setInPause,
    stories,
    users,
  };

  const { avatar: userAvatar } = users.find(
    (user: any) => user.name === userName
  ) as UsersInterface;

  useEffect(() => {
    if (inPause) {
      storiesDispatch({ type: STORIES_REDUCER_TYPES.toggleLoading });
      setInPause(false);
    }
  }, [currentStory]);

  return {
    storiesStateInitialValue,
    storyTransitionConfig,
    inPause,
    dispatch,
    userAvatar,
    userName,
    userId,
  };
};
