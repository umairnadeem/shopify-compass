import { Modal, FormLayout, TextField } from "@shopify/polaris";
import { connect } from "react-redux";
import * as React from "react";
import { RootState } from "../../../common/state/RootReducer";
import { useCallback, useState } from "react";
import { useModal } from "../../../common/Modal/useModal";

interface ReduxProps {
  modals: { [modalId: string]: boolean };
}

export const SUPPORT_MODAL_ID = "supportModal";

const SupportModal = (props: ReduxProps) => {
  const { hideModal } = useModal(SUPPORT_MODAL_ID);
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    []
  );
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    []
  );

  return (
    <Modal
      open={props.modals[SUPPORT_MODAL_ID]}
      onClose={hideModal}
      title="Contact support"
      primaryAction={{
        content: "Send",
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

export default connect<ReduxProps>((state: RootState) => ({
  modals: state.modal.modals,
}))(SupportModal);
