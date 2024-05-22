import { STORY_TIMING } from "../constants";
import { StoriesConfig } from "../types";

export const getInitialValue = (
  currentStories: string[],
  userId: number
): StoriesConfig => {
  return {
    userId,
    currentStories,
    currentStory: currentStories[0],
    storiesDispatch: null,
    loading: false,
    timing: STORY_TIMING,
    startTiming: 0,
  };
};
