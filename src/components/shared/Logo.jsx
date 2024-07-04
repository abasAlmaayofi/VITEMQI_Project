import React from "react";

function Logo({ color = "black" }) {
  return (
    <div className="m-plus-rounded-1c-regular">
      <span className="rounded-full px-[8px] py-[0.5px] bg-[#458FF6] text-slate-50 poppins-bold">
        M
      </span>
      <span className={`m-plus-rounded-1c-regular ml-1 text-${color}`}>
        QI Project
      </span>
    </div>
  );
}

export default Logo;
