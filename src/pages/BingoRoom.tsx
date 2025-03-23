import React, { useEffect, useRef, useState } from "react";

const WS_URL = "ws://localhost:5002/ws/game";

const BingoRoom: React.FC = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [matchedUsers, setMatchedUsers] = useState<string[]>([]);
  const [voteResult, setVoteResult] = useState<string | null>(null);
  const [canShowResult, setCanShowResult] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => console.log("Connected to WebSocket");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "rouletteInfo") {
        setSelectedQuestion(data.question);
        setMatchedUsers(data.users || []);
        setVoteResult(null);
        setCanShowResult(false);
      } else if (data.type === "voteResult") {
        setVoteResult(data.result);
        setCanShowResult(false);
      } else if (data.type === "votesCompleted") {
        setCanShowResult(true);
      }
    };

    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("Disconnected from WebSocket");

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  const spinRoulette = () => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "spinRoulette" }));
      setVoteResult(null);
      setCanShowResult(false);
    }
  };

  const showResult = () => {
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ type: "showResult" }));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green">
      <div className="relative flex h-[600px] w-[1000px] rounded-md bg-white px-10 py-6">
        {/* タイトル */}
        <div className="drop-shadow-custom absolute left-6 top-4 text-base font-bold text-red">
          びんごどん！
        </div>

        {/* 左側 */}
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full bg-yellow text-center shadow-custom">
            <p className="text-base font-bold leading-tight text-gray">
              {selectedQuestion ? (
                <>{selectedQuestion}</>
              ) : (
                <>
                  ルーレットを
                  <br />
                  回してね！
                </>
              )}
            </p>
          </div>
          <button
            onClick={spinRoulette}
            className="mt-6 rounded-sm bg-blue px-6 py-2 text-xs text-white shadow-custom"
          >
            ルーレットスタート
          </button>
        </div>

        {/* 右側 */}
        <div className="flex flex-1 flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-xs font-bold text-gray">回答者リスト</p>
            <div className="h-[500px] w-[300px] overflow-y-auto rounded-md border-sm border-orange bg-white p-4 text-center text-sm text-gray">
              {selectedQuestion ? (
                matchedUsers.length > 0 ? (
                  <ul className="space-y-1">
                    {matchedUsers.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>該当者なし</p>
                )
              ) : (
                <p>誰が当たるかな？</p>
              )}
            </div>
          </div>
          <button
            onClick={showResult}
            disabled={!canShowResult}
            className={`mt-4 rounded-sm px-6 py-2 text-xs text-white shadow-custom ${
              canShowResult ? "bg-blue" : "bg-gray"
            }`}
          >
            結果を見る
          </button>
          {voteResult && (
            <p className="mt-4 text-base font-bold text-blue">
              最も票を集めたのは：{voteResult}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BingoRoom;
