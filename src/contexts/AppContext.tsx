import { createContext } from "react";
import { AppContextInterface } from "../types";

export const AppContext = createContext<null | AppContextInterface>(null)