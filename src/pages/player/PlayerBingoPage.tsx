import React, { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:5002/ws/game";

const PlayerBingoPage: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      const userId = sessionStorage.getItem("userId");
      const userName = sessionStorage.getItem("userName");
      socket.send(JSON.stringify({ type: "joinGame", userId, userName }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (data.type === "bingoQuestions") {
        setQuestions(data.questions);
      } else if (data.type === "markQuestion") {
        setMarkedQuestions((prev) => [...prev, data.question]);
      }
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("Disconnected from WebSocket");

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  return (
    <div className="bg-green-200 flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-10 text-4xl font-bold">あなたのビンゴカード</h1>
        <div className="inline-block rounded-lg bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            {questions.map((text, index) => (
              <div
                key={index}
                className={`flex h-32 w-32 items-center justify-center rounded-md border-4 p-2 text-center text-sm transition-all duration-500 ${
                  markedQuestions.includes(text)
                    ? "border-yellow bg-yellow"
                    : "border-yellow-400 bg-white"
                }`}
                style={{
                  fontSize: `${calculateFontSize(text)}rem`,
                  wordBreak: "break-word",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ 長さに応じてフォントサイズを調整（例: 長文は少し小さく）
const calculateFontSize = (text: string): number => {
  const maxLength = 8;
  return text.length > maxLength ? 1.2 - (text.length - maxLength) * 0.1 : 1.2;
};

export default PlayerBingoPage;
