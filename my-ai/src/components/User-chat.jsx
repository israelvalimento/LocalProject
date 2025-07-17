export function Userchat({ user_text = "", user_id }) {
  return (
    <div className="flex flex-col w-full">
      <div className="self-end max-w-1/2">
        <p
          id={user_id}
          className="bg-[#4a4a4a68] rounded-4xl px-5 py-3.5 leading-5 break-words whitespace-pre-wrap"
        >
          {user_text}
        </p>
      </div>
    </div>
  );
}
