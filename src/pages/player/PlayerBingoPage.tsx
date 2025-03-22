import React, { useEffect, useState } from 'react';

const PlayerBingoPage: React.FC = () => {
  // ビンゴカードのテキスト
  const initialBingoCard = [
    "質問1", "質問2", "質問3",
    "質問4", "質問5", "質問6",
    "質問7", "質問8", "質問9"
  ];

  const [highlightedValue, setHighlightedValue] = useState<string | null>(null); // ハイライトする値

  useEffect(() => {
    // WebSocketやAPIから送信された値を想定 (3秒後に "質問5" を受け取る)
    setTimeout(() => {
      const incomingValue = "質問5";  // 値が送られてきたと仮定
      setHighlightedValue(incomingValue);
    }, 3000); // 3秒後に値を受け取る
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-green-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-10">プレイヤー1のカード</h1>
        <div className="bg-white rounded-lg p-4 shadow-lg inline-block">
          <div className="grid grid-cols-3 gap-4">
            {initialBingoCard.map((text, index) => (
              <div
                key={index}
                className={`w-32 h-32 p-2 text-center border-4 border-yellow rounded-md text-sm flex justify-center items-center transition-all duration-500
                ${
                  text === highlightedValue
                    ? 'bg-yellow border-yellow'  // 背景と枠を黄色にする
                    : 'bg-white border-yellow-400'
                }`}
                style={{
                  fontSize: `${calculateFontSize(text)}rem`,
                  wordBreak: 'break-word', // 長い文字列を改行
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

// 長さに応じてフォントサイズを調整 (改行対応)
const calculateFontSize = (text: string): number => {
  const maxLength = 8; // 8文字が基準
  return text.length > maxLength ? 1.2 - (text.length - maxLength) * 0.1 : 1.2; // 長い場合サイズ調整
};

export default PlayerBingoPage;