import React, { useContext } from "react";
import StoryAvatar from "./StoryAvatar";
import { UserContext } from "../contexts/UsersContext";

type Props = {};

function StoriesContainer({}: Props) {
  const { users, loading, error } = useContext(UserContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <section className="pl-5 flex space-x-3 border-b-gray-700 border-b pb-3 md:space-x-4">
      {users?.map((user: any) => (
        <StoryAvatar
          key={user.id}
          imgUrl={user.avatar}
          userName={user.name}
          userId={user.id}
        />
      ))}
    </section>
  );
}

export default StoriesContainer;
