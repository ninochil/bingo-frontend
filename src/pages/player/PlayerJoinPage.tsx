import React, { useState, useEffect } from 'react';
import TextField from '../../components/TextField';
import NewButton from '../../components/NewButton';

const PlayerJoinPage: React.FC = () => {
  // useStateの追加
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  // TODO:ここで正しい条件を設定
  const validateCode = (value: string) => {
    // 6文字以上でOKにしてみてる
    return value.length >= 6;
  };
  

  useEffect(() => {
    if (validateCode(code)) {
      setIsCodeValid(true);
      setErrorMessage('');
    } else {
      setIsCodeValid(false);
      setErrorMessage('参加コードが存在しないよ！');
    }
  }, [code]);

  useEffect(() => {
    // ニックネームが1文字以上
    if (name.trim() !== '') {
      setIsNicknameValid(true);
    } else {
      setIsNicknameValid(false);
    }
  }, [name]);

  const isButtonActive = isCodeValid && isNicknameValid;

  return (
    <div className='bg-green h-screen flex justify-center items-center'>
      <div className='h-[448px] w-[330px] bg-white rounded-md flex flex-col justify-center items-center'>
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

          {/* codeのエラーメッセージ */}
          {!isCodeValid && code !== '' && (
            <p className="text-red text-sm mt-2">{errorMessage}</p>
          )}

          {/* ボタン（有効/無効切り替え） */}
          <div className='flex flex-col items-center gap-3 pt-4'>
            <NewButton 
                label="すすむ"
                to="../PlayerStandbyPage"
                direction="forward"
                disabled={!isButtonActive}
            />
            <NewButton 
              label="もどる"
              to="/"
              direction="backward"
            />
          </div>
        </div>
        
      </div>
    </div>
  )
};

export default PlayerJoinPage;
