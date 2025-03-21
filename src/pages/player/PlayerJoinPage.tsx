import React from 'react';
import { TextField } from "@mui/material";

const TextFieldStyle = {
  width: "200px",
  
};

const PlayerJoinPage: React.FC = () => {
  return (
    <div className='bg-green h-screen flex justify-center items-center'>
      <div className='h-[448px] w-[330px] bg-white rounded-md flex flex-col items-center'>
        <div className='h-10 mt-10 font-banana text-sm'>参加コード</div>
        <div className='flex flex-col justify-center'>
          <TextField 
            label="Input" 
            style={TextFieldStyle}
          /> 
        </div>
        
      </div>
    </div>
  )
};

export default PlayerJoinPage;
