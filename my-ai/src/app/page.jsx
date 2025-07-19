'use client';
import { useEffect, useRef, useState } from "react";
import { Userchat } from "../components/User-chat";
import { Aichat } from "../components/Ai-chat";
import { Modal } from "../components/Modal";
import { SignOut } from "../components/SignOut";

import {
  model,
  db,
  auth,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc, 
  where,
  limit,
  onAuthStateChanged
} from "../../lib/firebase";

export default function MyAI() {
  const [user_prompt, setUser_prompt] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  
 

  useEffect(() => {
  if (!user) return;

  const messagesRef = collection(db, "messages");
  const userMessagesQuery = query(
    messagesRef,
    where("userId", "==", user.uid),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(userMessagesQuery, (snapshot) => {
    const newMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(newMessages);
  });

  return () => unsubscribe();
}, [user]);

  const handleChange = (e) => {
    setUser_prompt(e.target.value);
  };

 
    async function clearMessagesCollection() {
  try {
    const messagesRef = collection(db, "messages");
    const snapshot = await getDocs(messagesRef);

    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "messages", docSnap.id))
    );

    await Promise.all(deletePromises);
    console.log("All messages deleted.");
  } catch (error) {
    console.error("Error clearing messages collection:", error);
  }
}

  const handleSubmit = async () => {
  if (!user_prompt.trim()) return;

  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.error("User not signed in");
    return;
  }

  try {
    
    const userMessagesQuery = query(
      collection(db, "messages"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );

       const snapshot = await getDocs(userMessagesQuery);

       const pastMessages = snapshot.docs
      .reverse() 
      .map((doc) => ({
        prompt: doc.data().prompt,
        response: doc.data().response,
      }));

     const contextText = pastMessages.map(
      (msg) => `User: ${msg.prompt}\nAI: ${msg.response}`
    ).join("\n\n");

    const fullPrompt = `${contextText}\n\nUser: ${user_prompt}\nAI:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = await response.text();

    await addDoc(collection(db, "messages"), {
      userId: currentUser.uid,
      prompt: user_prompt,
      response: text,
      createdAt: serverTimestamp(),
    });

    setUser_prompt("");
  } catch (error) {
    console.error("Error submitting prompt:", error);
  }
};


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [user_prompt]);

  return (
  
  <main className="flex items-center justify-center h-screen w-screen">
  
    <Modal show={!user} />
    {user && (
      <>
        <SignOut />

        <div className="flex flex-col py-12 gap-10 h-full w-1/2">
          {/* Chat messages */}
          <section className="flex flex-col gap-10 p-5 h-full overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id}>
                <Userchat user_id={msg.id} user_text={msg.prompt} />
                <Aichat ai_id={msg.id} ai_text={msg.response} />
              </div>
            ))}
          </section>

          {/* Input */}
          <section className="flex items-center gap-5 py-2.5 px-3 bg-[#4a4a4a68] rounded-2xl">
            <textarea
              ref={textareaRef}
              className="w-full leading-5 resize-none overflow-y-auto max-h-32 py-3 px-4 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Type your message..."
              rows={1}
              value={user_prompt}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="border border-[#4d4d4de5] flex items-center gap-3.5 px-5 py-2.5 rounded-lg text-white"
            >
              send
              <img className="size-5 invert" src="/send-icon.svg" alt="" />
            </button>

            <button
              onClick={clearMessagesCollection}
              className="border border-[#4d4d4de5] flex items-center gap-3.5 px-5 py-2.5 rounded-lg text-white"
            >
              Clear Messages
              <img className="size-5 invert" src="/send-icon.svg" alt="" />
            </button>
          </section>
        </div>
      </>
    )}
  </main>
);

}
