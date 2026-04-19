import Image from "next/image";
import Provider from "./provider";

export default function Home() {
  return (
      <Provider>
          <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
              AI Recruiter by RNSIT CSE Students
          </div>
      </Provider>
  );
}
