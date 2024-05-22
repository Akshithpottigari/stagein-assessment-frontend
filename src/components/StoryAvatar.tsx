import React, { useContext } from "react";
import { AppContextInterface, StoryAvatarProps } from "../types";
import { AppContext } from "../contexts/AppContext";
import { toggleModal } from "./toggleModal";

function StoryAvatar({ imgUrl, userId, userName, isPost }: StoryAvatarProps) {
  const { dispatch } = useContext(AppContext) as AppContextInterface;
  const handleClick = () =>
    dispatch &&
    toggleModal(dispatch, {
      userName,
      userId,
    });
  return (
    <div
      className={`flex items-center ${!isPost && "flex-col cursor-pointer"}`}
      onClick={!isPost ? handleClick : () => null}
    >
      <div
        className={`w-16 h-16 gradient rounded-full p-[2px] mb-1 ${
          isPost && "mr-2"
        } ${!isPost && "md:w-20 md:h-20"}`}
      >
        <div className="w-full h-full bg-black rounded-full overflow-hidden">
          <img src={imgUrl} alt="" className="w-full h-full rounded-full" />
        </div>
      </div>

      <h3
        className={`${isPost ? "text-white" : "text-black"} text-sm font-bold text-center ${
          !isPost &&
          "whitespace-nowrap text-ellipsis overflow-hidden w-16 text-xs"
        } md:w-20 md:text-md ${isPost && "md:text-lg"}`}
      >
        {userName}
      </h3>
    </div>
  );
}

export default StoryAvatar;
