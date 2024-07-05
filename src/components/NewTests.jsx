import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { sendEmail } from "./emails/SendEmail";

function NewTests() {
  const [tests, setTests] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);

  const fetchAllNewTests = async () => {
    const { data, error } = await supabase
      .from("results")
      .select()
      .eq("marked", false);
    if (error) {
      console.log(error);
    }
    let modifiedData = [];
    for (const singletest of data) {
      singletest.feedback = [
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
      ];
      modifiedData.push(singletest);
    }
    setTests(modifiedData);
  };

  const fetchAllQuestions = async () => {
    const { data, error } = await supabase.from("questions").select();
    if (error) {
      console.log(error);
    }
    setQuestions(data);
  };

  const handleFeedbackValueChange = (e, testIndex, questionIndex) => {
    let bufferTests = tests;
    bufferTests[testIndex].feedback[questionIndex] = e;
    setTests([...bufferTests]);
  };

  const handlePointsValueChange = (e, testIndex, questionIndex) => {
    let bufferTests = tests;
    bufferTests[testIndex].points[questionIndex] = e.target.value;
    setTests([...bufferTests]);
    console.log(tests);
  };

  const sendFeedback = async (testIndex) => {
    // let insertedTest = tests[testIndex];
    // insertedTest.marked = true;
    // const { data, error } = await supabase.from("results").upsert(insertedTest);
    sendEmail();

    // if (error) {
    //   console.log(error);
    // }
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
              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400">{test.email}</p>
                <p className="text-xs text-gray-400">{test.created_at}</p>
              </div>
            }
            title={test?.name}
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
                    label="Answer"
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
                <div className="w-full mt-6">
                  <Input
                    isDisabled={question.type !== "essay"}
                    label="Points"
                    value={test?.points?.[questionIndex]}
                    onChange={(e) =>
                      handlePointsValueChange(e, testIndex, questionIndex)
                    }
                    className="w-16"
                  />
                  <Textarea
                    label="Feedback"
                    minRows={7}
                    variant="bordered"
                    placeholder="Enter your feedback.."
                    value={
                      test?.feedback?.[questionIndex] === null
                        ? ""
                        : test?.feedback?.[questionIndex]
                    }
                    onValueChange={(e) =>
                      handleFeedbackValueChange(e, testIndex, questionIndex)
                    }
                    className="md:w-[500px] w-[200px] mt-6 border-4 border-orange-600 rounded-2xl"
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                onPress={() => sendFeedback(testIndex)}
                color="primary"
                size="lg"
              >
                Send Feedback
              </Button>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default NewTests;
