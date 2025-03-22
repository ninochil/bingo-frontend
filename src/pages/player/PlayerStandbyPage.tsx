import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/NewButton";

const PlayerStandbyPage: React.FC = () => {
  const navigate = useNavigate();

  // 10秒後に自動的にビンゴ画面に遷移
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/PlayerBingoPage");
    }, 5000); // 10秒 (10000ミリ秒)

    return () => clearTimeout(timer); // クリーンアップ
  }, [navigate]);

  return (
    <div className="bg-green h-screen flex flex-col justify-center items-center gap-6">
      <div className="text-base text-gray text-outline">待機リスト 0人</div>
      <div className="h-[406px] w-[318px] bg-white rounded-md border-sm border-orange">
        {/* TODO: ここにリストを入れる */}
      </div>
      <div className="text-sm text-gray text-outline">ゲーム開始までしばらくお待ちください</div>
      <NewButton label="キャンセル" to="/" direction="backward" />
    </div>
  );
};

export default PlayerStandbyPage;