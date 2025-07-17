"use client";
import { Userchat } from "../components/User-chat";
import { Aichat } from "../components/Ai-chat";
import { useState, useEffect, useRef } from "react";
export default function myai() {
  const [user_prompt, setUser_prompt] = useState("");
  const handleChange = (e) => {
    setUser_prompt(e.target.value);
  };
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [user_prompt]);

  return (
    <main className="flex items-center justify-center h-dvh w-dvw">
      <div className="flex flex-col py-12  gap-10 h-full w-1/2">
        {/* chat section */}
        <section className="row-start-1 flex flex-col gap-10  p-5 h-full overflow-y-auto">
          {/* user side */}

          {user_prompt === "" ? (
            <Userchat
              user_id={1}
              className="hidden"
              user_text={user_prompt}
            ></Userchat>
          ) : (
            <Userchat
              user_id={1}
              className="block"
              user_text={user_prompt}
            ></Userchat>
          )}
          <Userchat
            user_id={1}
            className="hidden"
            user_text={user_prompt}
          ></Userchat>
          {/* ai side */}
          <Aichat
            ai_id={2}
            ai_text="lorem what the fuck Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Accusantium unde necessitatibus nemo voluptate consequuntur
          ratione ducimus, exercitationem debitis cupiditate inventore modi
          veritatis, eveniet minima praesentium totam ex tempora neque enim."
          ></Aichat>
        </section>
        {/* user input section  */}
        <section className="row-start-2 flex items-center gap-5 py-2.5 px-3 bg-[#4a4a4a68] rounded-2xl">
          <textarea
            ref={textareaRef}
            className="w-full leading-5 resize-none overflow-y-auto max-h-32 py-3 px-4 rounded-lg bg-transparent text-white placeholder-gray-400 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent focus:outline-none"
            placeholder="Type your message..."
            rows={1}
            value={user_prompt}
            onChange={handleChange}
            id=""
          />
          <button className="border-1 border-[#4d4d4de5] place-self-end cursor-pointer flex items-center capitalize gap-3.5 px-5 py-2.5 leading-5 rounded-lg ">
            send
            <img className="size-5 invert" src="/send-icon.svg" alt="" />
          </button>
        </section>
      </div>
    </main>
  );
}
