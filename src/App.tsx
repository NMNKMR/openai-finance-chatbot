import { useEffect, useState } from "react";
import { createThread } from "./api/thread";
import Home from "./pages/home";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const threadId = localStorage.getItem("threadId");
    if (!threadId) {
      createThread()
        .then((data) => {
          localStorage.setItem("threadId", data.thread);
        })
        .finally(() => {
          setLoading(false);
        });
    } else setLoading(false);
  }, []);

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center text-white">
      <h2>Loading...</h2>
    </div>
  ) : (
    <Home />
  );
}

export default App;
