export function Aichat({ ai_text = "", ai_id }) {
  return (
    <div className="flex flex-col w-full">
      <div className="self-start max-w-[75%]">
        <p
          id={ai_id}
          className="bg-[#ebebeb] text-[#1b1b1b] rounded-4xl px-5 py-3.5 leading-5 break-words whitespace-pre-wrap"
        >
          {ai_text}
        </p>
      </div>
    </div>
  );
}
