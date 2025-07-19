export function Aichat({ ai_text = "", ai_id }) {

  
  return (
    <div className="flex flex-col w-full">
      <div className="self-start max-w-[75%]">
        <p
          id={ai_id}
          className="bg-[#f0f0f0] text-black rounded-4xl px-5 py-3.5 leading-5 break-words whitespace-pre-wrap"
        >
          {ai_text}
          
        </p>
      </div>
    </div>
  );
}
