import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { supabase } from "../lib/supabase";

function CreateSurvey({ questions, setQuestions, notify }) {
  async function insertQuestions() {
    try {
      const { error } = await supabase
        .from("questions")
        .delete()
        .eq("version", 1);
      if (!error) {
        for (const question of questions) {
          const { data, error } = await supabase
            .from("questions")
            .insert({
              question: question.question,
              version: 1,
              type: question.type,
              answers: question?.answers,
              correctAnswer: question?.correctAnswer,
              points: question?.points,
            })
            .select();

          if (error) {
            console.error("Error inserting question:", error);
            continue;
          }
        }
        notify();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleOnChangeQuestion = (e, index) => {
    let bufferForQuestions = questions;
    bufferForQuestions[index].question = e.target.value;
    setQuestions([...bufferForQuestions]);
  };

  const handleOnValueChangeType = (e, index) => {
    let bufferForQuestions = questions;
    bufferForQuestions[index].type = e;
    setQuestions([...bufferForQuestions]);
  };

  const handleOnChangeAnswer = (e, index, answerIndex) => {
    let bufferForQuestions = questions;
    bufferForQuestions[index].answers[answerIndex] = e.target.value;
    setQuestions([...bufferForQuestions]);
  };

  const handleOnValuePoints = (e, index) => {
    let bufferForQuestions = questions;
    bufferForQuestions[index].points = e.target.value;
    setQuestions([...bufferForQuestions]);
    console.log(questions);
  };

  const handleOnValueCorrectAnswer = (e, index) => {
    let bufferForQuestions = questions;
    bufferForQuestions[index].correctAnswer = e;
    setQuestions([...bufferForQuestions]);
    console.log(questions);
  };

  const incrementQuestions = () => {
    if (questions.length < 15) {
      setQuestions([
        ...questions,
        {
          question: null,
          type: "essay",
          answers: [null, null, null, null, null],
        },
      ]);
    } else {
      window.alert("Can't add more questions");
    }
  };

  const removeQuestions = (index) => {
    let bufferForQuestions = questions;
    bufferForQuestions.splice(index, 1);
    setQuestions([...bufferForQuestions]);
  };
  return (
    <form className="bg-white rounded-xl p-4 max-h-screen overflow-y-scroll">
      {questions?.map((question, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="poppins-regular text-sm">
              Question. {index + 1}
            </label>
            <Textarea
              value={question?.question === null ? "" : question?.question}
              onChange={(e) => handleOnChangeQuestion(e, index)}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="poppins-regular text-sm">Type</label>
            <RadioGroup
              value={question?.type === null ? "" : question?.type}
              onValueChange={(e) => handleOnValueChangeType(e, index)}
              orientation="horizontal"
            >
              <Radio className="poppins-regular" size="sm" value="essay">
                Essay
              </Radio>
              <Radio
                className="poppins-regular "
                size="sm"
                value="multiple_choice"
              >
                Multiple Choice
              </Radio>
            </RadioGroup>
          </div>
          <Input
            label="Points"
            className="w-16"
            type="number"
            value={question?.points}
            onChange={(e) => handleOnValuePoints(e, index)}
          />
          {question?.type !== "essay" && (
            <div>
              <label className="poppins-regular text-sm">Choices</label>
              {question?.answers?.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="flex justify-center items-center gap-2 mt-2"
                >
                  <RadioGroup
                    value={
                      question?.correctAnswer === null
                        ? ""
                        : question?.correctAnswer
                    }
                    onValueChange={(e) => handleOnValueCorrectAnswer(e, index)}
                    className="w-full"
                  >
                    <Radio
                      value={answer === null ? "" : answer}
                      className="w-fit"
                    />
                    <Textarea
                      type="text"
                      value={answer === null ? "" : answer}
                      onChange={(e) =>
                        handleOnChangeAnswer(e, index, answerIndex)
                      }
                    />
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end">
            <Button color="danger" onPress={() => removeQuestions(index)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-end mt-8">
        <Button
          color="primary"
          onPress={incrementQuestions}
          //   onPress={setQuestions((preVal) => [...preVal])}
        >
          <FaPlus />
        </Button>
      </div>

      <Button
        color="primary"
        size="lg"
        className="mt-8 ml-auto px-12"
        isDisabled={questions.length === 0}
        onPress={insertQuestions}
      >
        Save
      </Button>
    </form>
  );
}

export default CreateSurvey;
