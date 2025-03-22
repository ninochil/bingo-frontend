import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WS_USER_URL = "ws://localhost:5002/ws/user";

const StandbyRoom: React.FC = () => {
  const [users, setUsers] = useState<{ userId: number; userName: string }[]>(
    [],
  );
  const ws = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = Number(params.get("userId"));
    const userName = params.get("userName") || "";

    const socket = new WebSocket(WS_USER_URL);
    ws.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket (StandbyRoom)");
      socket.send(
        JSON.stringify({
          type: "register",
          userId,
          userName,
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      if (data.type === "userList" && Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (data.type === "newUser" && data.user) {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === "userLeft" && data.userId) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== data.userId),
        );
      }
    };

    socket.onclose = () => console.log("Disconnected from WebSocket");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => {
      socket.close();
    };
  }, []);

  const handleStart = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: "gameStart" }));
    }
    navigate("/BingoRoom");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green">
      <div className="relative flex h-[600px] w-[1000px] rounded-md bg-white px-10 py-6">
        {/* タイトル */}
        <div className="drop-shadow-custom absolute left-6 top-4 text-base font-bold text-red">
          びんごどん！
        </div>

        {/* 左側：ルームコード */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <div className="text-sm text-gray">＼ ルームコード ／</div>
          <div className="flex gap-4">
            {[4, 8, 5, 9].map((num, idx) => (
              <div
                key={idx}
                className="drop-shadow-custom flex h-20 w-20 items-center justify-center rounded-full bg-yellow text-lg font-bold text-white shadow-custom"
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* 右側：待機リスト */}
        <div className="flex flex-1 flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <p className="mb-5 text-sm font-bold text-gray">
              待機リスト {users.length}人
            </p>
            <div className="h-[400px] w-[300px] overflow-y-auto rounded-md border-sm border-orange bg-white p-4 text-center text-sm text-gray">
              {users.length > 0 ? (
                <ul className="space-y-1">
                  {users.map((user) => (
                    <li key={user.userId}>{user.userName}</li>
                  ))}
                </ul>
              ) : (
                <p>ユーザーがいません</p>
              )}
            </div>
          </div>

          {/* ボタン */}
          <div className="mt-4 flex gap-16">
            <button className="rounded-sm bg-lightgray px-6 py-2 text-xs text-white shadow-custom">
              キャンセル
            </button>
            <button
              onClick={handleStart}
              className="rounded-sm bg-blue px-6 py-2 text-xs text-white shadow-custom"
            >
              はじめる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandbyRoom;
