import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useTimer } from "use-timer";
import Quiz from "../components/Quiz";
import Logo from "../components/shared/Logo";
import squareDots from "../assets/svgs/squaredots.svg";
import { Image } from "@nextui-org/image";
import Squaredots from "../components/shared/Squaredots";
import Timer from "../components/Timer";
import StartingSurveyModal from "../components/StartingSurveyModal";
import { useDisclosure } from "@nextui-org/react";
import { supabase } from "../lib/supabase";

const Survey = () => {
  const [time, setTime] = useState(2100);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startTest, setStartTest] = useState(false);
  const [closeTest, setCloseTest] = useState(false);

  const fetchTime = async () => {
    const { data, error } = await supabase.from("timers").select();
    if (error) {
      console.log(error);
    }
    setTime(data?.[0]?.time);
  };

  useEffect(() => {
    fetchTime();
  }, []);

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (time === 0) {
      setCloseTest(true);
    }
  }, [time]);

  return (
    <>
      <div className="relative w-screen z-0  min-h-screen  bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80 tracking-wide p-4 overflow-x-hidden">
        <div className="absolute -left-8 top-8 z-20">
          <Squaredots />{" "}
        </div>

        <Logo />
        <div className="w-screen relative z-0">
          <Timer
            startTest={startTest}
            initialTime={time}
            time={time}
            setTime={setTime}
          />
          <Quiz closeTest={closeTest} setCloseTest={setCloseTest} />
        </div>
        <div className="absolute -right-8 bottom-44 z-20">
          <Squaredots />
        </div>
      </div>
      <StartingSurveyModal
        setStartTest={setStartTest}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Survey;
