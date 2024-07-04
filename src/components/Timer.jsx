import React, { useState, useEffect } from "react";

function ConvertToMinutes(time) {
  return Math.floor(time / 60);
}

function ConvertToSeconds(time) {
  return (time / 60 - Math.floor(time / 60)) * 60;
}

const Timer = ({ startTest, initialTime, time, setTime }) => {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Create a new web worker
    const myWorker = new Worker("worker.js");

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      setTime(event.data);
    };

    // Save the worker instance to state
    setWorker(myWorker);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    if (worker && startTest) {
      worker.postMessage(initialTime);
    }
  }, [worker, startTest]);

  return (
    <h1
      className={`rounded-full shadow-lg   poppins-semibold border-4 border-white trakcing-wide md:w-28 md:h-28 w-20 h-20 md:text-3xl  text-xl md:mr-32 mr-12 ml-auto  text-white flex justify-center items-center ${
        time <= 300
          ? "shadow-danger/30  bg-danger/60"
          : "shadow-[#458FF6]/30  bg-[#458FF6]/60"
      }`}
    >
      {ConvertToMinutes(time) + ":" + ConvertToSeconds(time).toFixed()}
    </h1>
  );
};

export default Timer;
