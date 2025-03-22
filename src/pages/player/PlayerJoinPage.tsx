import React, { useState, useEffect } from "react";
import TextField from "../../components/TextField";
import NewButton from "../../components/NewButton";

const WS_URL = "ws://localhost:5002/ws/user";

const PlayerJoinPage: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: ここで参加コードの正当性チェック（仮：4文字以上）
  const validateCode = (value: string) => {
    return value.length >= 4;
  };

  // 参加コードチェック
  useEffect(() => {
    if (validateCode(code)) {
      setIsCodeValid(true);
      setErrorMessage("");
    } else {
      setIsCodeValid(false);
      setErrorMessage("参加コードが存在しないよ！");
    }
  }, [code]);

  // ニックネームチェック
  useEffect(() => {
    setIsNicknameValid(name.trim() !== "");
  }, [name]);

  const isButtonActive = isCodeValid && isNicknameValid;

  // WebSocket 接続
  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => console.log("Connected to WebSocket");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.userId) {
        // userId を sessionStorage に保存
        sessionStorage.setItem("userId", data.userId);
        const savedName = sessionStorage.getItem("userName");
        console.log("保存された名前:", savedName);
      }
    };

    socket.onclose = () => console.log("Disconnected from WebSocket");
    socket.onerror = (error) => console.error("WebSocket Error:", error);

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  // 「すすむ」ボタンを押したときに参加リクエストを送信
  const handleJoin = () => {
    if (ws && isButtonActive) {
      // ニックネーム を sessionStorage に保存
      sessionStorage.setItem("userName", name);
      const messageData = JSON.stringify({
        type: "join",
        userName: name,
      });
      ws.send(messageData);
      setName("");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green">
      <div className="flex h-[448px] w-[330px] flex-col items-center justify-center rounded-md bg-white">
        <div className="flex flex-col items-center">
          <TextField
            label="参加コード"
            placeholder="主催者に確認してね！"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <TextField
            label="ニックネーム"
            placeholder="みんながわかる名前にしてね！"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* エラーメッセージ */}
          {!isCodeValid && code !== "" && (
            <p className="mt-2 text-sm text-red">{errorMessage}</p>
          )}

          {/* ボタン */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <NewButton
              label="すすむ"
              to="../PlayerStandbyPage"
              direction="forward"
              disabled={!isButtonActive}
              onClick={handleJoin}
            />
            <NewButton label="もどる" to="/" direction="backward" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerJoinPage;
