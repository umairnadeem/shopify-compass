import { Modal, FormLayout, TextField } from "@shopify/polaris";
import { connect } from "react-redux";
import * as React from "react";
import { ActionCreator } from "../../state/ReduxUtils";
import { RootState } from "../../state/RootReducer";
import { hideModal } from "../Modal/ModalActions";
import { useCallback, useState } from "react";
import { useModal } from "../Modal/useModal";

interface ReduxProps {
    modals: { [modalId: string]: boolean };
}
  
interface DispatchProps {
  hideModal: ActionCreator;
}

export const SUPPORT_MODAL_ID = "supportModal";

const SupportModal = (props: ReduxProps & DispatchProps) => {
    const { hideModal } = useModal(SUPPORT_MODAL_ID);
    const [supportSubject, setSupportSubject] = useState('');
    const [supportMessage, setSupportMessage] = useState('');
    const handleSubjectChange = useCallback(
        (value) => setSupportSubject(value),
        [],
      );
      const handleMessageChange = useCallback(
        (value) => setSupportMessage(value),
        [],
      );

    return (
    <Modal
      open={props.modals[SUPPORT_MODAL_ID]}
      onClose={hideModal}
      title="Contact support"
      primaryAction={{
        content: 'Send',
        onAction: hideModal,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default connect<ReduxProps, DispatchProps>(
    (state: RootState) => ({ modals: state.modal.modals })
)(SupportModal);
