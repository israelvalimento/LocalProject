export function Aichat({ ai_text = "", ai_id }) {
  return (
    <div className="flex flex-col w-full">
      <div className="self-start max-w-[75%]">
        <p id={ai_id} className="">
          {ai_text}
        </p>
      </div>
    </div>
  );
}
