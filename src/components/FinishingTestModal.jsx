import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

function FinishingTestModal({ isOpen, onOpenChange, setCloseTest }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
        placement="center"
        size="sm"
        isKeyboardDismissDisabled={false}
      >
        <ModalContent className="w-[250px] h-[250px]  shadow-md shadow-white/40">
          {(onClose) => (
            <>
              <ModalBody className="w-full h-full flex justify-center items-center">
                <h1 className="text-xl text-slate-700 poppins-regular tracking-wide text-center">
                  Are you sure?
                </h1>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  color="danger"
                  onPress={onClose}
                  //   className="w-28 h-28 rounded-full mx-auto bg-[#458FF6] shadow-md shadow-[#458FF6]/40 poppins-bold text-xl"
                >
                  Cancel
                </Button>

                <Button
                  size="lg"
                  color="primary"
                  onPress={() => setCloseTest(true)}
                  //   className="w-28 h-28 rounded-full mx-auto bg-[#458FF6] shadow-md shadow-[#458FF6]/40 poppins-bold text-xl"
                >
                  Finish
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default FinishingTestModal;
