import { REDUCER_TYPES } from "../enums";
import { AppContextInterface, Payload } from "../types";

export const reducerFn = (state: AppContextInterface, payload: Payload) => {
  const { type, config } = payload;

  switch (type) {
    case REDUCER_TYPES.toggleModal:
      return {
        ...state,
        modal: {
          status: !state.modal.status,
          userId: config?.userId,
          userName: config?.userName,
        },
      };
    case REDUCER_TYPES.setModalUser:
      return {
        ...state,
        modal: {
          ...state.modal,
          userId: config?.userId,
          userName: config?.userName,
        },
      };
    default:
      return state;
  }
};
