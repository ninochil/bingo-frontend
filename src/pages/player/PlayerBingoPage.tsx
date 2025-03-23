import React, { useEffect, useRef, useState } from "react";
import NewButton from "../../components/NewButton";
import RadioButton from "../../components/RadioButton";

const WS_URL = "ws://localhost:5002/ws/game";

const PlayerBingoPage: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<string[]>([]);

  // popup
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  // ラジオボタンで誰が選択されてるか
  const [selectedOption, setSelectedOption] = useState('option1');
  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

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
        <h1 className="mb-10 text-base">あなたのビンゴカード</h1>
        <div className="inline-block rounded-lg bg-white p-4 shadow-lg mb-5">
          <div className="grid grid-cols-3 gap-4">
            {questions.map((text, index) => (
              <div
                key={index}
                className={`flex h-[97px] w-[97px] items-center justify-center rounded-xs border-4 border-yellow p-2 text-center text-gray text-sm transition-all duration-500 ${
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
        <NewButton 
          label="ポップアップを開く"
          direction="forward"
          onClick={openPopup}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-8 w-[300px] text-center shadow-lg relative">
            <div className="text-sm mb-5 text-gray">良かった人を投票してね！</div>
            {/* TODO: ここに回答者リストの名前表示 */}
            <div className="flex flex-col mx-3 gap-2 mb-6">
              <RadioButton
                label="もーすぎ"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleRadioChange}
              />
              <RadioButton
                label="かまの"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleRadioChange}
              />
              <RadioButton
                label="じん"
                value="option3"
                checked={selectedOption === 'option3'}
                onChange={handleRadioChange}
              />
            </div>

            <NewButton
              label="投票する"
              direction="forward"
              onClick={closePopup}
            />
          </div>
        </div>
      )}

    </div>
  );
};

// ✅ 長さに応じてフォントサイズを調整（例: 長文は少し小さく）
const calculateFontSize = (text: string): number => {
  const maxLength = 8;
  return text.length > maxLength ? 1.2 - (text.length - maxLength) * 0.1 : 1.2;
};

export default PlayerBingoPage;
