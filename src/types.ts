export interface StoryAvatarProps {
  imgUrl: string;
  userName: string;
  userId: number;
  isPost?: boolean;
}

export interface StoriesContextInterface {
  userId: number;
  currentStories: string[];
  currentStory: string;
  loading: boolean;
  storiesDispatch: React.Dispatch<Payload> | null;
  timing: number;
  startTiming: number;
  userName?: string;
}

export interface Payload {
  type: string;
  content?: any;
  config?: Config | StoriesConfig;
}

export interface StoriesConfig extends StoriesContextInterface {}

export interface Config {
  userName?: string;
  userId?: number;
}

export interface AppContextInterface {
  modal: {
    status: boolean;
    userId: number;
    userName?: string | undefined;
  };
  dispatch: React.Dispatch<Payload> | null;
}

export interface startStoryTransitionProps {
  currentStoryIndex: number;
  currentStories: string[];
  userId: number;
  storiesDispatch: React.Dispatch<Payload> | null;
  dispatch: React.Dispatch<Payload> | null;
  timing?: number;
  inPause?: boolean;
  setInPause?: React.Dispatch<React.SetStateAction<boolean>>;
  stories: any[];
  users: any[];
}

export interface UsersInterface {
  id: number;
  name: string;
  avatar: string;
}

export interface StoryImgProps {
  imgUrl: string;
  children: JSX.Element;
}

export interface StoryButtonProps {
  children?: React.ReactNode;
  direction?: "left" | "right";
}

export interface NextPrevStoryProps {
  direction: "left" | "right";
  userId: number;
  currentStories: string[];
  currentStory: string;
  storiesDispatch: React.Dispatch<Payload> | null;
  dispatch: React.Dispatch<Payload> | null;
  stories: any[];
  users: any[];
}

export interface ConditionalNodeProps {
  condition: boolean;
  children: JSX.Element;
}
