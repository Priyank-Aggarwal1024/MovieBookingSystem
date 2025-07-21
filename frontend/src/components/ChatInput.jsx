import docSvg from "../assets/doc.svg";
import emojiSvg from "../assets/emoji.svg";
import sendSvg from "../assets/send.svg";
const ChatInput = () => {
  return (
    <div className="sticky bottom-0 w-full">
      <div className="max-w-[636px] mx-auto rounded-xl bg-white shadow-md p-2.5">
        <div className="px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-xl">
          <input
            type="text"
            placeholder="Type..."
            className="flex-1 text-sm text-gray-700 outline-none"
          />
          <div className="flex items-center gap-2">
            <img src={emojiSvg} alt="Emoji Icon" className="cursor-pointer" />
            <img src={docSvg} alt="Document Icon" className="cursor-pointer" />
            <div className="w-9 h-9 bg-[rgba(177,177,177,0.25)] bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer">
              <img src={sendSvg} alt="Send Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
