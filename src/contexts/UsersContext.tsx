import React, { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { UsersInterface } from "../types";

// Create a context for users
export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: any) => {
  const [users, setUsers] = useState<UsersInterface[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("api/data");
        setUsers(response.data.data.USERS);
        setStories(response.data.data.STORIES);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, stories, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
