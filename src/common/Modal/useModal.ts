import { ModalActionTypes } from "./ModalActions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/RootReducer";

export const useModal = (id: string) => {
  const dispatch = useDispatch();
  const showModal = useCallback(() => {
    dispatch({ type: ModalActionTypes.SHOW_MODAL, id });
  }, [dispatch]);
  const hideModal = useCallback(() => {
    dispatch({ type: ModalActionTypes.HIDE_MODAL, id });
  }, [dispatch]);
  const isActive = useSelector((state: RootState) => state.modal.modals[id]);

  return { showModal, hideModal, isActive };
};
