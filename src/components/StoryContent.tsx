import { useContext } from "react";
import { StoriesContext } from "../contexts/StoriesContext";
import {
  AppContextInterface,
  ConditionalNodeProps,
  StoriesContextInterface,
  StoryImgProps,
  startStoryTransitionProps,
} from "../types";
import { AppContext } from "../contexts/AppContext";
import { getCurrentStory, handleLoad } from "../lib/utils";
import { StoryButton } from "./StoryButton";
import { MoveLeft, MoveRight } from "lucide-react";
import { UserContext } from "../contexts/UsersContext";

export const StoryContent: React.FC<StoryImgProps> = ({
  imgUrl,
  children,
}): JSX.Element => {
  const { storiesDispatch, currentStories } = useContext(
    StoriesContext
  ) as StoriesContextInterface;
  const {
    dispatch,
    modal: { userId },
  } = useContext(AppContext) as AppContextInterface;
  const { users, loading, error, stories } = useContext(UserContext);
  const { currentStoryIndex } = getCurrentStory(currentStories, imgUrl);

  const isFirstStory = currentStoryIndex <= 0;
  const isFirstAuthor = userId <= 0;
  const isVeryFirstStory = isFirstAuthor && isFirstStory;
  const isLastStory = currentStoryIndex >= currentStories.length - 1;
  const isLastAuthor = userId >= stories.length - 1;
  const isVeryLastStory = isLastStory && isLastAuthor;

  const configStoryTransition: startStoryTransitionProps = {
    userId,
    currentStoryIndex,
    stories,
    users,
    currentStories,
    storiesDispatch,
    dispatch,
  };

  return (
    <div className="mx-auto h-[95vh] max-w-[500px] px-2 relative mt-4">
      {children}

      <ConditionalNode condition={!isVeryFirstStory}>
        <StoryButton direction="left">
          <MoveLeft className="w-4 h-4 stroke-white" />
        </StoryButton>
      </ConditionalNode>

      <img
        src={imgUrl}
        alt=""
        className="h-full w-full object-cover object-center rounded-xl"
        onLoad={handleLoad(configStoryTransition)}
      />

      <ConditionalNode condition={!isVeryLastStory}>
        <StoryButton>
          <MoveRight className="w-4 h-4 stroke-white" />
        </StoryButton>
      </ConditionalNode>
    </div>
  );
};

export const ConditionalNode: React.FC<ConditionalNodeProps> = ({
  condition,
  children,
}) => {
  if (condition) return <> {children} </>;

  return <></>;
};
