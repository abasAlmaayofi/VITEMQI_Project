import { Chip, Input } from "@nextui-org/react";
import React, { useState } from "react";
import Logo from "./shared/Logo";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";

function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState("top");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorLogin, setErrorLogin] = useState(false);
  const navigate = useNavigate();
  const userToken = secureLocalStorage.getItem("userToken");
  const isAuthenticated = userToken === import.meta.env.VITE_APP_USER_TOKEN;

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorLogin(true);
      console.error(error);
    } else {
      secureLocalStorage.setItem(
        "userToken",
        import.meta.env.VITE_APP_USER_TOKEN
      );
      navigate("admin");
    }
  }

  const handleShowModal = () => {
    if (isAuthenticated) {
      navigate("/admin");
    }
    onOpen();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 mb-16">
        <Logo />
        <div>
          <Button
            color=""
            size="md"
            onPress={handleShowModal}
            className="poppins-medium tracking-wide bg-[#458FF6] text-slate-50 shadow-[5px_5px_0px_0px_rgba(0,0,210)]"
          >
            Login
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <p className="text-gray-500 text-sm">
                  Only admins are allowed to login
                </p>
                {errorLogin && (
                  <Chip size="sm" color="danger">
                    Error with your credentials
                  </Chip>
                )}
                <Input
                  label="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <Input
                  label="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={signInWithEmail}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Header;
