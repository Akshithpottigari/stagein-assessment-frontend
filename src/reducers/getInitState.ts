import { AppContextInterface } from "../types";

export const getInitState = (): AppContextInterface => ({
  modal: {
    status: false,
    userId: 0
  },
  dispatch: null
})