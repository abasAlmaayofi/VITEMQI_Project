import { useRef, useState } from "react";
import Header from "../components/Header";
import healthCare from "../assets/svgs/healthcare.svg";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Input,
  Button,
  Link,
} from "@nextui-org/react";

import squareDots from "../assets/svgs/squaredots.svg";

import Form from "../components/Form";
import Footer from "../components/Footer";
import { FaArrowDown } from "react-icons/fa";

function Main() {
  const scrollViewToFormRef = useRef(null);
  const handleScrollViewToForm = () => {
    scrollViewToFormRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="w-screen md:h-screen h-auto bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80 tracking-wide">
        <Header />
        <div className="relative flex flex-col md:flex-row items-start w-full h-[80%]">
          <div className="md:hidden flex m-4 z-0">
            <h2 className="poppins-bold text-3xl tracking-wide relative">
              <span className="rounded-full px-[10px] py-[0.5px] bg-[#458FF6] text-slate-50 ">
                A
              </span>{" "}
              Survey for Professionals in the Kuwait Board of Internal Medicine
            </h2>
          </div>
          <div className="absolute right-0">
            <Image src={squareDots} alt="squaredots" />
          </div>
          <div className="w-screen md:w-1/2 p-4">
            <Image
              src={healthCare}
              className="md:w-[600px] w-[300px] h-auto"
              alt="healthcare_image"
            />
            <Button
              onClick={handleScrollViewToForm}
              className="flex ml-auto mr-10 mt-16 md:hidden w-fit bg-[#458FF6]/80 backdrop-blur-md rounded-full py-10  text-slate-50"
            >
              <FaArrowDown size={30} />
            </Button>
          </div>
          <Form scrollViewToFormRef={scrollViewToFormRef} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Main;
