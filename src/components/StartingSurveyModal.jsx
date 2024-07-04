import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import Countdown from "react-countdown";

export default function StartingSurveyModal({
  setStartTest,
  isOpen,
  onOpen,
  onOpenChange,
}) {
  const [startCounting, setStartCounting] = useState(false);
  const renderer = ({ onClose, hours, minutes, seconds, completed }) => {
    if (completed) {
      setStartTest(true);
      console.log("happened");
      onOpenChange(false);
      return;
    } else {
      return (
        <span className="text-3xl text-[#458FF6] flex justify-center items-center rounded-full poppins-bold w-28 h-28 border-2 border-[#458FF6] shadow-md shadow-[#458FF6]">
          {seconds}
        </span>
      );
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        size="sm"
        isKeyboardDismissDisabled={true}
        closeButton={<></>}
      >
        <ModalContent className="w-[250px] h-[250px]  shadow-md shadow-white/40">
          {(onClose) => (
            <>
              <ModalBody className="w-full h-full flex justify-center items-center">
                {startCounting ? (
                  <>
                    <h1 className="text-xl text-slate-700 poppins-regular tracking-wide text-center">
                      Test is starting after..
                    </h1>
                    <Countdown date={Date.now() + 3000} renderer={renderer} />
                  </>
                ) : (
                  <>
                    <h1 className="text-xl text-slate-700 poppins-regular tracking-wide text-center">
                      Click start to begin the test
                    </h1>
                    <Button
                      size="lg"
                      color="primary"
                      onPress={() => setStartCounting(true)}
                      className="w-28 h-28 rounded-full mx-auto bg-[#458FF6] shadow-md shadow-[#458FF6]/40 poppins-bold text-xl"
                    >
                      Start
                    </Button>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
