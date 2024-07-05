import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Accordion,
  AccordionItem,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";

function PastTests() {
  const [tests, setTests] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);

  const fetchAllNewTests = async () => {
    const { data, error } = await supabase
      .from("results")
      .select()
      .eq("marked", true);
    if (error) {
      console.log(error);
    }
    setTests(data);
  };

  const fetchAllQuestions = async () => {
    const { data, error } = await supabase.from("questions").select();
    if (error) {
      console.log(error);
    }
    setQuestions(data);
  };

  useEffect(() => {
    fetchAllNewTests();
    fetchAllQuestions();
  }, []);
  return (
    <div className="bg-white rounded-xl p-4 max-h-screen overflow-y-scroll">
      <Accordion>
        {tests.map((test, testIndex) => (
          <AccordionItem
            key={testIndex}
            aria-label="Accordion 1"
            subtitle={
              <span className="text-xs text-gray-400">{test.created_at}</span>
            }
            title={test.name}
          >
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-6">
                <h1 className="poppins-semibold text-md tracking-wide text-gray-700 mb-4">
                  <span>Q. {questionIndex + 1}</span>{" "}
                  <span>{question?.question}</span>
                </h1>
                {question.type == "essay" ? (
                  <Textarea
                    isDisabled
                    minRows={7}
                    variant="bordered"
                    placeholder="Enter your answer.."
                    className="md:w-[500px] w-[200px] mt-6"
                    value={
                      test?.answers?.[questionIndex] !== null
                        ? test?.answers?.[questionIndex]
                        : ""
                    }
                  />
                ) : (
                  <RadioGroup
                    isDisabled
                    value={
                      test?.answers?.[questionIndex] !== null
                        ? test?.answers?.[questionIndex]
                        : ""
                    }
                  >
                    {question?.answers?.map((answer, index) => (
                      <Radio key={index} value={answer}>
                        {answer}
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default PastTests;
