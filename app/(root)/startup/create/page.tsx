import { auth } from "@/auth";
import BackToHome from "@/components/BackToHome";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const CreatePage = async () => {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <BackToHome />
        <h1 className="heading">Créer une Startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default CreatePage;
