import { useEffect, useState } from "react";
import useGetMessages from "../../hooks/messages/useGetMessages";
import { addNewMessage } from "../../api/message";

type Message = {
  id: string | number;
  role: "user" | "assistant";
  message: string;
};

function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { messages: data, isLoading } = useGetMessages({
    threadId: localStorage.getItem("threadId"),
  });

  const addMessage = async () => {
    setLoading(true);
    
    const response = await addNewMessage({
      threadId: localStorage.getItem("threadId"),
      message: message,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: response.user,
        role: "user",
        message: message,
      },
      {
        id: response.assistant.id,
        role: "assistant",
        message: response.assistant.content[0].text.value,
      },
    ]);
    
    setMessage("");
    setLoading(false);
  };
  
  useEffect(() => {
    document.body.scrollIntoView({ block: "end", behavior: "smooth" });
    data &&
    setMessages(
      data.reverse().map((message) => ({
        id: message.id,
        role: message.role,
        message: message.content[0].text.value,
        }))
      );
  }, [data]);
  return (
    <div className="relative text-white/80 min-h-screen">
      <header className="w-full sticky top-0 z-10 bg-black shadow-lg py-2 px-4">
        <h3 className="text-2xl">Finance Chat Bot</h3>
      </header>
      <main className="mx-auto mt-6 pb-28 w-3/4">
        {isLoading ? (
          <div className="w-full text-center text-lg">
            <h2>Fetching messages...</h2>
          </div>
        ) : messages.length ? (
          <ul className="flex flex-col gap-7">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`flex gap-2 rounded-xl ${
                  message.role === "user"
                    ? "w-3/5 bg-black/30 self-end p-2"
                    : ""
                }`}
              >
                {message.role === "assistant" && (
                  <span className="min-w-2 h-5 bg-black rounded-full" />
                )}
                <p>{message.message}</p>
              </li>
            ))}
            {loading && (
              <>
                <li className="rounded-xl w-3/5 bg-black/30 self-end p-2">
                  <p>{message}</p>
                </li>
                <li className="flex gap-2">
                  <span className="min-w-2 h-5 bg-black rounded-full" />
                  <p>Generating Response...</p>
                </li>
              </>
            )}
          </ul>
        ) : (
          <div className="w-full text-center text-lg">
            <h2>Start asking your financial related questions.</h2>
          </div>
        )}
      </main>
      <div className="fixed bottom-6 w-full flex justify-center">
        <div className="h-full w-3/4 py-2 px-2 rounded-full bg-black flex justify-between">
          <textarea
            placeholder="Message..."
            value={loading ? "" : message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent px-2 h-full resize-none flex-grow outline-none overflow-hidden"
          />
          <button
            className="px-4 rounded-full bg-white font-semibold text-xl text-black flex justify-center items-center disabled:bg-opacity-70"
            disabled={loading}
            onClick={addMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
