import { createContext } from "react";
import { StoriesContextInterface } from "../types";

export const StoriesContext = createContext<null | StoriesContextInterface>(
  null
);
