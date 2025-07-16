import React from "react";
import { useState } from "react";
export function Modal() {
  const [display, SetDisplay] = useState("");

  const handleDsiplay = () => {
    SetDisplay((prev) => (prev ? "block" : "hidden"));
  };

  return (
    <>
      <div className={display}>
        <div className="fixed z-10 blur-md bg-[#b0b0b033]  w-full h-full"></div>
        <main className="fixed flex items-center justify-center z-20  w-full h-full">
          <div className="flex border-1 p-5  bg-[#ffffff]  flex-col items-center z-20 size-92 rounded-2xl justify-center gap-5">
            <button
              onClick={handleDsiplay}
              className="flex gap-5 bg-[#4f4f4f] hover:bg-[#333333] px-5 py-5 leading-5 rounded-xl cursor-pointer"
            >
              <img src="/guest-icon.svg" alt="" />
              <p>sign as guest</p>
            </button>
            <p className="text-black uppercase">or</p>
            <button className="flex items-center justify-center w-full gap-5 bg-[#4f4f4f] hover:bg-[#333333] px-5 py-5 leading-5 rounded-xl cursor-pointer">
              <img src="/google-icon.svg" alt="" />
              <p>sign in with google</p>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
