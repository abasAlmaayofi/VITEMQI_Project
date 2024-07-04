import { Input, Button, Chip } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";

function Form({ scrollViewToFormRef }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target[1].value !== e.target[2].value) {
      console.log(e.target[1].value);
      console.log(e.target[2].value);

      setError(true);
    } else {
      setError(false);
      secureLocalStorage.setItem("name", e.target[0].value);
      secureLocalStorage.setItem("email", e.target[1].value);
      secureLocalStorage.setItem("phone", e.target[3].value);
      navigate("survey");
    }
  };

  return (
    <>
      <div
        ref={scrollViewToFormRef}
        id="form"
        className="md:w-1/2 w-full h-1/2 px-8 py-4"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h1 className="poppins-bold text-3xl">Personal Details</h1>
          <h1 className="text-gray-500">
            You need to fill-in your personal details so that we may send you
            the results afterwards
          </h1>

          <Input
            label="Name"
            radius="full"
            size="lg"
            isRequired
            type="text"
            required
            //   onChange={handleNameChange}
            className="border border-black rounded-full"
            classNames={{
              label: "text-black",
              inputWrapper: "bg-transparent",
            }}
            placeholder="Write your name..."
          />
          <Input
            label="Email"
            radius="full"
            size="lg"
            isRequired
            type="email"
            required
            //   onChange={handleEmailChange}
            className="border border-black rounded-full"
            classNames={{
              label: "text-black",
              inputWrapper: "bg-transparent",
            }}
            placeholder="Write your email..."
          />
          <Input
            label="Rewrite Email"
            radius="full"
            size="lg"
            isRequired
            type="email"
            color={error ? "danger" : ""}
            required
            //   onChange={handleRewriteEmailChange}
            className="border border-black rounded-full"
            classNames={{
              label: "text-black",
              inputWrapper: "bg-transparent",
            }}
            placeholder="Write your email again..."
          />
          <div className={error ? "block" : "hidden"}>
            <Chip size="sm" variant="flat" color="danger">
              Email doesn't match!
            </Chip>
          </div>
          <Input
            label="Phone (+965)"
            radius="full"
            size="lg"
            isRequired
            type="number"
            required
            //   onChange={handleRewriteEmailChange}
            className="border border-black rounded-full"
            classNames={{
              label: "text-black",
              inputWrapper: "bg-transparent",
            }}
            placeholder="Write your phone number ..."
          />

          <Button
            type="submit"
            className="bg-[#458FF6] w-fit text-white poppins-bold ml-auto rounded-full py-7"
          >
            Start test
          </Button>
        </form>
      </div>
    </>
  );
}

export default Form;
