import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";
import Question from "./question";
import FinishingTestModal from "./FinishingTestModal";
import { useDisclosure } from "@nextui-org/react";

function Quiz({ closeTest, setCloseTest }) {
  const [noCurrentQuestion, setNoCurrentQuestion] = useState(0);
  const [prevNextTrigger, SetPrevNextTrigger] = useState(true);
  const [results, setResults] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [points, setPoints] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const name = secureLocalStorage.getItem("name");
  const email = secureLocalStorage.getItem("email");
  const phone = secureLocalStorage.getItem("phone");
  const [quiz, setQuiz] = useState({ questions: [{}] });

  const navigate = useNavigate();

  const fetchQuestions = async () => {
    const { data, error } = await supabase.from("questions").select();
    if (!error) {
      setQuiz({ questions: data });
    } else {
      console.log(error);
    }
    let bufferPoints = [];
    for (const question of data) {
      bufferPoints.push(question.points);
    }
    setPoints(bufferPoints);
  };

  const handleNextQuestions = () => {
    setNoCurrentQuestion((PreVal) => PreVal + 1);
    SetPrevNextTrigger(true);
  };

  const handlePreviousQuestions = () => {
    if (noCurrentQuestion !== 0) {
      setNoCurrentQuestion((PreVal) => PreVal - 1);
    }
    SetPrevNextTrigger(false);
  };

  useEffect(() => {
    if (!name || !email || !phone) {
      navigate("/");
    }
  }, [results]);

  useEffect(() => {
    if (closeTest) {
      postResults();
    }
  }, [closeTest]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function postResults() {
    const { error } = await supabase.from("results").insert({
      name,
      email,
      phone,
      answers: results,
      marked: false,
      points: points,
    });
    if (error) {
      console.log(error);
    } else {
      navigate("/test-completed");
    }
  }

  return (
    <div className="mt-8 w-screen">
      <div className="mb-8">
        <Progress
          label="Completed Questions"
          size="lg"
          value={noCurrentQuestion + 1}
          maxValue={quiz?.questions?.length}
          color="success"
          showValueLabel={true}
          className="md:max-w-4xl max-w-sm md:mx-auto"
        />
      </div>
      <div className="overflow-y-scroll border-l-4 md:mx-auto border-[#458FF6] md:w-[900px] w-[400px] md:h-[450px] h-[500px] p-4 flex flex-col bg-slate-100">
        <div className="relative w-full h-full overflow-y-scroll">
          <AnimatePresence initial={false}>
            {quiz?.questions?.map(
              (question, index) =>
                noCurrentQuestion == index && (
                  <motion.div
                    className="absolute"
                    key={index}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      duration: 0.1,
                    }}
                    initial={{ x: prevNextTrigger ? 1000 : -1000, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: prevNextTrigger ? -1000 : 1000, opacity: 0 }}
                  >
                    <Question
                      results={results}
                      setResults={setResults}
                      questionNo={index}
                      questionText={question?.question}
                      answerType={question?.type}
                      answers={question?.answers}
                      //   correctAnswer={question.correctAnswer}
                      //   points={question?.point}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
        <div className="mt-auto flex justify-end items-end gap-6 w-full h-fit pr-4">
          {/* PREVIOUS Button */}
          <Button
            onPress={handlePreviousQuestions}
            color="default"
            className="mt-20"
            isDisabled={noCurrentQuestion === 0}
          >
            Previous
          </Button>

          {/* NEXT Button */}
          {noCurrentQuestion === quiz?.questions?.length - 1 ? (
            <Button color="primary" onPress={onOpen} className="mt-20">
              Finish
            </Button>
          ) : (
            <Button
              color="primary"
              onPress={handleNextQuestions}
              className="mt-20 "
            >
              Next
            </Button>
          )}
        </div>
      </div>
      <FinishingTestModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setCloseTest={setCloseTest}
      />
    </div>
  );
}

export default Quiz;
