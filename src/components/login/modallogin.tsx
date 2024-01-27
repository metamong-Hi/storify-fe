import React from "react";
import { Modal, Button } from "@nextui-org/react";
import LoginPage from "@/components/login/login";
function ModalLogin({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} width="600px">
      <Modal.Header>Login or Sign Up</Modal.Header>
      <Modal.Body>
        <LoginPage />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLogin;
