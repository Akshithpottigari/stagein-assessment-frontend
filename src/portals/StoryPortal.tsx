import React from "react";
import { StoriesContext } from "../contexts/StoriesContext";
import { useStoryPause } from "../hooks/useStoryPause";
import { Payload, StoriesContextInterface } from "../types";
import { StoriesHover } from "../components/StoriesHover";
import StoryAvatar from "../components/StoryAvatar";
import { handleClick, handlePause } from "../lib/utils";
import { Pause, Play, X } from "lucide-react";

const StoryPortal: React.FC = (): JSX.Element => {
  const {
    storiesStateInitialValue,
    storyTransitionConfig,
    inPause,
    dispatch,
    userName,
    userAvatar,
    userId,
  } = useStoryPause();

  return (
    <StoriesContext.Provider
      value={storiesStateInitialValue as StoriesContextInterface}
    >
      <section className="fixed top-0 w-full h-screen bg-black">
        <StoriesHover>
          <div className="p-3 flex justify-between items-center">
            <StoryAvatar
              imgUrl={userAvatar}
              userName={userName as string}
              userId={userId}
              isPost={true}
            />

            <div className="flex items-center space-x-2 z-10">
              <button onClick={handlePause(storyTransitionConfig)}>
                {inPause ? (
                  <Play className="w-4 h-4 stroke-white" />
                ) : (
                  <Pause className="w-4 h-4 stroke-white" />
                )}
              </button>

              <button
                onClick={handleClick(dispatch as React.Dispatch<Payload>)}
              >
                <X className="w-4 h-4 stroke-white" />
              </button>
            </div>
          </div>
        </StoriesHover>
      </section>
    </StoriesContext.Provider>
  );
};

export { StoryPortal };
