import React, { useEffect, useRef, useState } from "react";
import NewButton from "../../components/NewButton";
import RadioButton from "../../components/RadioButton";

const WS_URL = "ws://localhost:5002/ws/game";

const PlayerBingoPage: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<string[]>([]);

  // 投票モーダル制御
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<string[]>([]);
  const [votedUser, setVotedUser] = useState<string | null>(null);

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
      } else if (data.type === "rouletteInfo") {
        const selfName = sessionStorage.getItem("userName");
        setMatchedUsers(data.users || []);
        setVotedUser(null); // reset
        if (!data.users.includes(selfName)) {
          setShowVoteModal(true); // 回答者でなければ表示
        }
      } else if (data.type === "updateQuestion") {
        setQuestions((prev) =>
          prev.map((q) => (q === data.old ? data.new : q)),
        );
      }
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("Disconnected from WebSocket");

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  const submitVote = () => {
    const userId = sessionStorage.getItem("userId");
    if (socketRef.current && userId && votedUser) {
      socketRef.current.send(
        JSON.stringify({ type: "vote", userId, votedUser }),
      );
      setShowVoteModal(false);
      setVotedUser(null);
    }
  };

  return (
    <div className="bg-green-200 flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-10 text-base">あなたのビンゴカード</h1>
        <div className="mb-5 inline-block rounded-lg bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            {questions.map((text, index) => (
              <div
                key={index}
                className={`flex h-[97px] w-[97px] items-center justify-center rounded-xs border-4 p-2 text-center text-sm text-gray transition-all duration-500 ${
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

      {/* 投票モーダル */}
      {showVoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[300px] rounded-md bg-white p-6 text-center shadow-lg">
            <div className="mb-4 text-sm text-gray">
              良かったと思う回答者を選んでください
            </div>
            <div className="mb-6 flex flex-col gap-2">
              {matchedUsers.map((user, idx) => (
                <RadioButton
                  key={idx}
                  label={user}
                  value={user}
                  checked={votedUser === user}
                  onChange={(val) => setVotedUser(val)}
                />
              ))}
            </div>
            <NewButton
              label="投票する"
              direction="forward"
              onClick={submitVote}
              disabled={!votedUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const calculateFontSize = (text: string): number => {
  const maxLength = 20;
  return text.length > maxLength ? 1.2 - (text.length - maxLength) * 0.1 : 1.2;
};

export default PlayerBingoPage;
