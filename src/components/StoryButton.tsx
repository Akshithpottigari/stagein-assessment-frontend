import { useContext } from "react";
import { StoriesContext } from "../contexts/StoriesContext";
import {
  AppContextInterface,
  NextPrevStoryProps,
  StoriesContextInterface,
} from "../types";
import { AppContext } from "../contexts/AppContext";
import { getInitialClassName, setNextPrevStory } from "../lib/utils";

interface StoryButtonProps {
  children?: React.ReactNode;
  direction?: "left" | "right";
}

const StoryButton: React.FC<StoryButtonProps> = ({
  children,
  direction = "right",
}): JSX.Element => {
  const { userId, currentStories, currentStory, storiesDispatch } = useContext(
    StoriesContext
  ) as StoriesContextInterface;
  const { dispatch } = useContext(AppContext) as AppContextInterface;
  const nextPrevStoryConfig: NextPrevStoryProps = {
    direction,
    userId,
    currentStories,
    currentStory,
    storiesDispatch,
    dispatch,
  };

  const handleChangeStory = (triggerEl: "container" | "wrapper") => () => {
    if (window.screen.width >= 640 && triggerEl === "container") return;
    setNextPrevStory(nextPrevStoryConfig);
  };

  return (
    <div
      className={getInitialClassName(direction)}
      onClick={handleChangeStory("container")}
    >
      <button
        className="bg-black rounded-full hidden sm:block"
        onClick={handleChangeStory("wrapper")}
      >
        {children}
      </button>
    </div>
  );
};

export { StoryButton };
