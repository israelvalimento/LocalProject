import React from "react";
import { Userchat } from "../components/User-chat";
import { Aichat } from "../components/Ai-chat";
import { useState } from "react";

export function Tuperai() {
  const [user_prompt, setUser_prompt] = useState("");
  const handleChange = (e) => {
    setUser_prompt(e.target.value);
  };

  return (
    <main className="flex items-center justify-center h-dvh w-dvw">
      <div className="flex flex-col py-12  gap-10 h-full w-1/2">
        {/* chat section */}
        <section className="row-start-1 flex flex-col gap-10  p-5 h-full overflow-y-auto">
          {/* user side */}
          <Userchat user_id={1} user_text={user_prompt}></Userchat>
          {/* ai side */}
          <Aichat ai_id={2} ai_text="lorem what the fuck"></Aichat>
        </section>
        {/* user input section  */}
        <section className="row-start-2 flex items-center gap-5 h-20 p-5 bg-[#4a4a4a68] rounded-2xl">
          <input
            className="w-1/1  py-5 leading-5  cursor-pointer focus:outline-0"
            type="text"
            value={user_prompt}
            onChange={handleChange}
            id=""
          />
          <button className="border-1 border-[#4d4d4de5] cursor-pointer flex items-center uppercase gap-3.5 px-5 py-3.5 leading-5 rounded-lg ">
            send
            <img className="size-5 invert" src="/send-icon.svg" alt="" />
          </button>
        </section>
      </div>
    </main>
  );
}
