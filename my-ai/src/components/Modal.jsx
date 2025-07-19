'use client';
import {
  auth,
  signInAnonymously,
} from "../../lib/firebase";
import{db,collection, query, where, getDocs, deleteDoc, doc} from "../../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";



  export function Modal({ show = true }) {
  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      console.log("Signed in anonymously");
    } catch (error) {
      alert("Anonymous sign-in failed:", error);
    }
  };
  const deleteAnonymousMessages = async (anonUid) => {
  const q = query(collection(db, "messages"), where("userId", "==", anonUid));
  const snapshot = await getDocs(q);
  
  const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(doc(db, "messages", docSnap.id)));
  await Promise.all(deletePromises);

  console.log(`Deleted ${snapshot.docs.length} messages from anonymous user.`);
};

  const handleGoogleSignIn = async () => {
  const anonUser = auth.currentUser;

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (anonUser && anonUser.isAnonymous) {
      await deleteAnonymousMessages(anonUser.uid); 
      await anonUser.delete();                     
      console.log("Anonymous account and messages deleted.");
    }

    console.log("Signed in with Google:", result.user.uid);
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
};

  if (!show) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center gap-5">
        <button
          onClick={handleAnonymousSignIn}
          className="flex gap-3 items-center bg-[#4f4f4f] hover:bg-[#333333] px-5 py-3 rounded-xl text-white w-full justify-center"
        >
          <img src="/guest-icon.svg" alt="Guest Icon" className="w-6 h-6" />
          <span>Sign in as Guest</span>
        </button>

        <p className="uppercase text-sm tracking-wide">or</p>

        <button
          onClick={handleGoogleSignIn}
          className="flex gap-3 items-center bg-[#4f4f4f] hover:bg-[#333333] px-5 py-3 rounded-xl text-white w-full justify-center"
        >
          <img src="/google-icon.svg" alt="Google Icon" className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
