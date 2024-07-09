import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import React from "react";

function LoadingModal({ isOpen }) {
  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      closeButton={<></>}
    >
      <ModalContent className="w-[150px] h-[150px]  shadow-md shadow-white/40">
        {(onClose) => (
          <>
            <ModalBody className="flex justify-center items-center">
              <Spinner size="lg" color="primary" />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default LoadingModal;
