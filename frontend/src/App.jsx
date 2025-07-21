import "./App.css";
import MovieMateOptions from "./components/MovieMateOptions";
import userSvg from "./assets/user.svg";
import ChatInput from "./components/ChatInput";

function App() {
  return (
    <>
      <div className="app w-full h-screen flex flex-col bg-[#F9FAFB]">
        <header className="w-full h-16 bg-blue-800 flex items-center justify-between px-4 shadow">
          <div className="text-white text-xl font-semibold"></div>
          <button className="flex items-center gap-2 px-4 py-1 border border-white rounded-full">
            <div className="w-4 h-4">
              <img
                src={userSvg}
                alt="SVG"
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-white text-sm">View profile</span>
          </button>
        </header>
        <MovieMateOptions />
        <ChatInput />
      </div>
    </>
  );
}

export default App;
