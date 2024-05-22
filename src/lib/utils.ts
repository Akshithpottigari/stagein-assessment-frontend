import { toggleModal } from "../components/toggleModal";
import { STORY_TIMING } from "../constants";
import { REDUCER_TYPES, STORIES_REDUCER_TYPES } from "../enums";
import {
  NextPrevStoryProps,
  Payload,
  StoriesConfig,
  StoriesContextInterface,
  startStoryTransitionProps,
} from "../types";

export class Timer {
  static id: Timeout | null;
}

export const getCurrentStory = (stories: string[], current: string) => {
  const currentStoryIndex = stories?.findIndex((story) => story === current);
  return {
    currentStoryIndex,
    currentStory: stories[currentStoryIndex],
  };
};

export const handleClick = (dispatch: React.Dispatch<Payload>) => () => {
  clearTimeout(Timer.id);
  dispatch && toggleModal(dispatch);
};

export const handlePause =
  (storyTransitionConfig: startStoryTransitionProps) => () => {
    const { storiesDispatch, timing, inPause, setInPause } =
      storyTransitionConfig;

    if (!inPause) clearTimeout(Timer.id);
    if (inPause)
      Timer.id = setTimeout(
        startStoryTransition(storyTransitionConfig),
        timing
      );

    storiesDispatch?.({ type: STORIES_REDUCER_TYPES.toggleLoading });
    setInPause?.((prev) => !prev);
  };

export const startStoryTransition =
  (config: startStoryTransitionProps) => () => {
    const {
      currentStoryIndex,
      currentStories,
      storiesDispatch,
      dispatch,
      userId,
      stories,
      users,
    } = config;

    const storiesRemaining = currentStoryIndex < currentStories?.length - 1;

    if (storiesRemaining) {
      const newIndex = currentStoryIndex + 1;

      storiesDispatch?.({
        type: STORIES_REDUCER_TYPES.setSingleStory,
        content: currentStories[newIndex],
      });
    }

    if (!storiesRemaining) {
      const moreUsersStories = userId < stories?.length - 1;

      if (moreUsersStories) {
        const newStoriesBatch = stories[userId + 1].stories;
        const userName = users.find((user) => user.id === userId + 1)?.name;

        storiesDispatch?.({
          type: STORIES_REDUCER_TYPES.setNewStoriesBatch,
          config: {
            currentStories: newStoriesBatch,
          } as StoriesContextInterface,
        });

        dispatch?.({
          type: REDUCER_TYPES.setModalUser,
          config: {
            userId: userId + 1,
            userName,
          },
        });
      }

      if (!moreUsersStories) toggleModal(dispatch as React.Dispatch<Payload>);
    }
  };

export const setNextPrevStory = (config: NextPrevStoryProps) => {
  const {
    currentStories,
    currentStory,
    direction,
    userId,
    storiesDispatch,
    dispatch,
    stories,
    users,
  } = config;
  const { currentStoryIndex } = getCurrentStory(currentStories, currentStory);
  const endBannerTransition = () => {
    const spanEl = document.getElementById(currentStory);
    spanEl?.classList.remove("animation-pause");
    spanEl?.classList.remove("story-hover-transition");

    if (direction === "right") {
      spanEl?.classList.add("transition-finished");
    } else {
      const prevSpanEl = document.getElementById(
        currentStories[currentStoryIndex - 1]
      );
      prevSpanEl?.classList.remove("story-hover-transition");
    }
  };

  if (direction === "left") {
    const storiesInLeft = currentStoryIndex > 0;
    const authorsInLeft = userId > 0;
    const goingLeft = storiesInLeft || authorsInLeft;

    if (goingLeft) {
      if (storiesInLeft) {
        endBannerTransition();

        storiesDispatch?.({
          type: STORIES_REDUCER_TYPES.setSingleStory,
          content: currentStories[currentStoryIndex - 1],
        });
      } else if (authorsInLeft) {
        const newUserIdIndex = userId - 1;
        const newStoriesBatch = stories[newUserIdIndex].stories;
        const userName = users.find((user) => user.id === newUserIdIndex)?.name;

        storiesDispatch?.({
          type: STORIES_REDUCER_TYPES.setNewStoriesBatch,
          config: { currentStories: newStoriesBatch } as StoriesConfig,
        });

        dispatch?.({
          type: REDUCER_TYPES.setModalUser,
          config: {
            userId: userId - 1,
            userName,
          },
        });
      }

      clearTimeout(Timer.id);
    }
  } else {
    const storiesInRight = currentStoryIndex < currentStories?.length - 1;
    const authorsInRight = userId < stories?.length - 1;
    const goingRight = storiesInRight || authorsInRight;

    if (goingRight) {
      if (storiesInRight) {
        endBannerTransition();
        storiesDispatch?.({
          type: STORIES_REDUCER_TYPES.setSingleStory,
          content: currentStories[currentStoryIndex + 1],
        });
      } else if (authorsInRight) {
        const newUserIdIndex = userId + 1;
        const newStoriesBatch = stories[newUserIdIndex].stories;
        const userName = users.find((user) => user.id === newUserIdIndex)?.name;

        storiesDispatch?.({
          type: STORIES_REDUCER_TYPES.setNewStoriesBatch,
          config: { currentStories: newStoriesBatch } as StoriesConfig,
        });

        dispatch?.({
          type: REDUCER_TYPES.setModalUser,
          config: {
            userId: userId + 1,
            userName,
          },
        });
      }

      clearTimeout(Timer.id);
    }
  }
};

export const getInitialClassName = (direction: string) => {
  const dirClassName = `${direction}-dir-gradient sm:${direction}-full`;
  let classname = `absolute h-full w-1/5 top-0 grid place-content-center ${dirClassName}`;
  if (direction === "right") classname += " right-2 sm:translate-x-[100%]";
  if (direction === "left") classname += " sm:translate-x-[-100%]";
  return classname;
};

export const handleLoad =
  (configStoryTransition: startStoryTransitionProps) => () => {
    const { currentStories, currentStoryIndex, storiesDispatch } =
      configStoryTransition;

    initTransition(currentStories[currentStoryIndex]);
    Timer.id = setTimeout(
      startStoryTransition(configStoryTransition),
      STORY_TIMING
    );
    storiesDispatch?.({ type: STORIES_REDUCER_TYPES.startTiming });
  };

export const initTransition = (spanId: string) => {
  const spanTransition = document.getElementById(spanId);
  spanTransition?.classList.add("story-hover-transition");
};
