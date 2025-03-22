import React from "react";
import NewButton from "../../components/NewButton";

const PlayerStandbyPage: React.FC = () => {
  return (
    <div className="bg-green h-screen flex flex-col justify-center items-center gap-6">
      {/* TODO: 0人固定にしちゃっててすまにー */}
      <div className="text-base text-gray text-outline">待機リスト  0人</div>
      <div className="h-[406px] w-[318px] bg-white rounded-md border-sm border-orange">
        {/* TODO: ここにリスト入れるにだ */}
      </div>
      <div className="text-sm text-gray text-outline">ゲーム開始までしばらくお待ちください</div>
      <NewButton 
        label="キャンセル"
        to="/"
        direction="backward"
      />
    </div>
  );
}

export default PlayerStandbyPage;