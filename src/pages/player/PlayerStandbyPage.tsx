import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/NewButton";

const WS_URL = "ws://localhost:5002/ws/user";

const PlayerStandbyPage: React.FC = () => {
  const [users, setUsers] = useState<{ userId: string; userName: string }[]>(
    [],
  );
  const ws = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  // WebSocket接続とイベント処理
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");

    const socket = new WebSocket(WS_URL);
    ws.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket (PlayerStandby)");
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
      console.log("WebSocket message:", data);

      if (data.type === "userList" && Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (data.type === "newUser" && data.user) {
        setUsers((prev) => [...prev, data.user]);
      } else if (data.type === "userLeft" && data.userId) {
        setUsers((prev) => prev.filter((u) => u.userId !== data.userId));
      } else if (data.type === "gameStart") {
        // 🔹 親が "gameStart" を送ったらゲーム画面へ遷移
        navigate("/PlayerBingoPage");
      }
    };

    socket.onclose = () => console.log("Disconnected from WebSocket");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    return () => {
      socket.close();
    };
  }, [navigate]);

  // キャンセル処理
  const handleCancel = () => {
    const userId = sessionStorage.getItem("userId");
    if (ws.current && userId) {
      ws.current.send(JSON.stringify({ type: "cancel", userId }));
    }
    window.close(); // ウィンドウを閉じる
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-green">
      <div className="text-outline text-base text-gray">
        待機リスト {users.length}人
      </div>

      {/* ユーザーリスト枠 */}
      <div className="flex h-[406px] w-[318px] flex-col items-center overflow-y-auto rounded-md border-sm border-orange bg-white p-4">
        {/* TODO: スクロール可能な参加者一覧（中央揃え・上から表示） */}
        {users.length > 0 ? (
          <div className="flex w-full flex-col items-center gap-2">
            {users.map((user) => (
              <div key={user.userId} className="text-center text-sm text-gray">
                {user.userName}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray">参加者を待っています…</p>
        )}
      </div>

      <div className="text-outline text-sm text-gray">
        ゲーム開始までしばらくお待ちください
      </div>

      {/* キャンセルボタン */}
      <NewButton
        label="キャンセル"
        to="/"
        direction="backward"
        onClick={handleCancel}
      />
    </div>
  );
};

export default PlayerStandbyPage;
