import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from "./ModalActions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/RootReducer";

export const useModal = (
  id: string
): { showModal: () => void; hideModal: () => void; isActive: boolean } => {
  const dispatch = useDispatch();
  const showModal = useCallback(() => {
    dispatch(showModalAction(id));
  }, [dispatch, id]);
  const hideModal = useCallback(() => {
    dispatch(hideModalAction(id));
  }, [dispatch, id]);
  const isActive = useSelector((state: RootState) => state.modal.modals[id]);

  return { showModal, hideModal, isActive };
};
