import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NbrButton } from "./ui/nbrButton";

const BackToHome = () => {
  return (
    <NbrButton
      asChild
      className="drop-shadow-lg bg-secondary rounded-full p-2 absolute top-24 left-14 max-sm:left-8 max-sm:top-[4.5rem]"
    >
      <Link href="/">
        <ArrowLeft className="size-6 text-black" />
      </Link>
    </NbrButton>
  );
};

export default BackToHome;
