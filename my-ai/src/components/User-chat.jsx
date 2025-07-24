export function Userchat({ user_text = "", user_id, className = "" }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" self-end max-w-[75%]">
        {/* <h3 className="">{user_id}</h3> */}
        <p
          id={user_id}
          className={`${className} bg-[#4a4a4a68] text-white rounded-4xl px-5 py-3.5 leading-5 break-words whitespace-pre-wrap`}
        >
          {user_text}
        </p>
      </div>
    </div>
  );
}
