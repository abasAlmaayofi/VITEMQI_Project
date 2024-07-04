import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";
import Squaredots from "../components/shared/Squaredots";
import Logo from "../components/shared/Logo";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateSurvey from "../components/CreateSurvey";

function Admin() {
  const notify = () =>
    toast.success("Survey successfully updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  const [selectedSidebarButton, setSelectedSidebarButton] =
    useState("createSurvey");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const userToken = secureLocalStorage.getItem("userToken");
  const isAuthenticated = userToken === import.meta.env.VITE_APP_USER_TOKEN;
  const [questions, setQuestions] = useState([
    {
      question: null,
      type: "essay",
      answers: [null, null, null, null, null],
    },
  ]);

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    isAuthenticated && (
      <div className="flex flex-row overflow-hidden">
        {!showSidebar && (
          <div className="absolute -left-4 z-10 mt-2 ">
            <Button
              className="bg-slate-700 text-white"
              onPress={() => setShowSidebar(true)}
            >
              <FaArrowRight />
            </Button>
          </div>
        )}
        <AnimatePresence mode="popLayout">
          {showSidebar && (
            <motion.div
              initial={{ x: -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -1000, opacity: 0 }}
              transition={{ type: "spring", stiffness: "30", duration: 0.2 }}
              className="md:w-[250px] w-[300px] h-screen bg-slate-800 py-2 px-3"
            >
              <div className="flex flex-row-reverse gap-2 justify-between items-center">
                <Button
                  size="sm"
                  className="text-slate-700 bg-slate-100"
                  onPress={() => setShowSidebar(false)}
                >
                  <FaArrowLeft />
                </Button>
                <Logo color="white" />
              </div>
              <div className="mx-2"></div>
              <div className="mt-12 flex flex-col gap-6 poppins-bold tracking-wide ">
                <Button
                  onPress={(e) => setSelectedSidebarButton(e.target.value)}
                  value="createSurvey"
                  size="md"
                  className={`w-full rounded-none text-sm ${
                    selectedSidebarButton === "createSurvey"
                      ? " text-slate-700 poppins-semibold  bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80"
                      : "bg-slate-700 text-white  poppins-semibold "
                  }`}
                >
                  Create Survey
                </Button>
                <Button
                  onPress={(e) => setSelectedSidebarButton(e.target.value)}
                  value="newTests"
                  size="md"
                  className={`w-full rounded-none text-sm ${
                    selectedSidebarButton === "newTests"
                      ? "text-slate-700 poppins-semibold tracking-widest bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80"
                      : "bg-slate-700 text-white  poppins-semibold "
                  }`}
                >
                  All New Tests
                </Button>
                <Button
                  onPress={(e) => setSelectedSidebarButton(e.target.value)}
                  value="pastTests"
                  size="md"
                  className={`w-full rounded-none text-sm ${
                    selectedSidebarButton === "pastTests"
                      ? "text-slate-700 poppins-semibold  bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80"
                      : "bg-slate-700 text-white  poppins-semibold"
                  }`}
                >
                  All Past Tests
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 relative z-0  h-screen  bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80 tracking-wide p-4 overflow-x-hidden">
          <div className="absolute -left-8 top-8 z-20">
            <Squaredots />
          </div>

          <div className="w-full h-full py-12 px-4 flex flex-col gap-6">
            <h1 className="poppins-bold text-3xl tracking-wide">
              {selectedSidebarButton === "createSurvey"
                ? "Create Survey"
                : selectedSidebarButton === "newTests"
                ? "All New Tests"
                : "All Past Tests"}
            </h1>
            <div className="md:w-1/2 w-full flex-1 mx-auto">
              {selectedSidebarButton === "createSurvey" ? (
                <CreateSurvey
                  questions={questions}
                  setQuestions={setQuestions}
                  notify={notify}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="absolute -right-8 bottom-44 z-20">
            <Squaredots />
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
}

export default Admin;
