import { REDUCER_TYPES } from "../enums";
import { Config, Payload } from "../types";

export const toggleModal = (
  dispatch: React.Dispatch<Payload>,
  config?: Config
) => {
  toggleOverflowHidden("body");
  if (dispatch) dispatch({ type: REDUCER_TYPES.toggleModal, config });
};

export const toggleOverflowHidden = (element: string) => {
  const el = document.querySelector(element) as HTMLDivElement;
  el.classList.toggle("toHidden");
};
