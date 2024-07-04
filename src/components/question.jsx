import { Radio, RadioGroup } from "@nextui-org/radio";
import { Textarea } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";

function question({
  results,
  setResults,
  questionNo,
  questionText,
  answerType,
  answers = ["cats", "dogs", "pets"],
  //   correctAnswer,
  //   points,
}) {
  const handleChangingValue = (index, newValue) => {
    const newResults = [...results];
    newResults[index] = newValue;
    setResults(newResults);
  };

  return (
    <div className="w-full">
      <h1 className="poppins-semibold text-md tracking-wide text-gray-700">
        <span>Q. {questionNo + 1}</span> <span>{questionText}</span>
      </h1>
      {answerType == "essay" ? (
        <Textarea
          minRows={7}
          variant="bordered"
          placeholder="Enter your answer.."
          className="md:w-[700px] w-[200px] mt-6"
          value={results[questionNo]}
          onChange={(e) => handleChangingValue(questionNo, e.target.value)}
        />
      ) : (
        <RadioGroup onValueChange={(e) => handleChangingValue(questionNo, e)}>
          {answers?.map((answer, index) => (
            <Radio key={index} value={answer}>
              {answer}
            </Radio>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}

export default question;
