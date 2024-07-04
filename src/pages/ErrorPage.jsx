import { Button } from "@nextui-org/react";
import { Link, useRouteError } from "react-router-dom";
import Logo from "../components/shared/Logo";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-[#DEEEFE]/80 tracking-wide flex flex-col justify-center items-center gap-4">
      <div className="mb-10">
        <Logo />
      </div>

      <h1 className="poppins-bold text-3xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button
        color="primary"
        as={Link}
        href="/"
        className="poppins-medium text-lg py-6"
      >
        Go To Home
      </Button>
    </div>
  );
}
