import React from "react";
import Squaredots from "../components/shared/Squaredots";

function Finish() {
  return (
    <div className="relative w-screen z-0  min-h-screen  bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80 tracking-wide p-4 overflow-x-hidden flex justify-center items-center">
      <div className="absolute -left-8 top-8 z-20">
        <Squaredots />{" "}
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="poppins-bold tracking-wide text-4xl">
          Thank You for Taking the Test
        </h1>
        <p className="poppins-medium tracking-wide">
          Your results will be sent to you by email later
        </p>
      </div>
      <div className="absolute -right-8 bottom-44 z-20">
        <Squaredots />
      </div>
    </div>
  );
}

export default Finish;
