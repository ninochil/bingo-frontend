import React, { useState } from 'react';
import TextField from '../../components/TextField';
import NewButton from '../../components/NewButton';

const PlayerJoinPage: React.FC = () => {
  // useStateの追加
  const [name, setName] = useState('');

  return (
    <div className='bg-green h-screen flex justify-center items-center'>
      <div className='h-[448px] w-[330px] bg-white rounded-md flex flex-col justify-center items-center'>
        <div className="flex flex-col items-center">
          <TextField
              label="参加コード"
              placeholder="主催者に確認してね！"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <TextField
              label="ニックネーム"
              placeholder="みんながわかる名前にしてね！"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <div className='flex flex-col items-center gap-3 pt-4'>
            <NewButton 
                label="すすむ"
                to="./TopPage.tsx"
                direction="forward"
            />
            <NewButton 
              label="もどる"
              to="./TopPage.tsx"
              direction="backward"
            />
          </div>
        </div>
        
      </div>
    </div>
  )
};

export default PlayerJoinPage;
