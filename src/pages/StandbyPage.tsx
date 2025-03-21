import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import '../styles/StandbyPage.css';


const StandbyPage: React.FC = () => {
    const navigate = useNavigate();

    const BingoClick = () => {
        navigate('/BingoPage')
    }

    const CancelClick = () => {
        navigate('/')
    }

    return (
        <div className="standbyPageContainer ">
            <div className="standbyPageCard">
                <h1 className="standbyTitle">びんごどん！</h1>
                <div className="room-code-section">
                    <p className="room-code-label">＼ ルームコード ／</p>
                    <div className="room-code">
                        {['4', '8', '5', '9'].map((num, index) => (
                            <div key={index} className="circle">{num}</div>
                        ))}
                    </div>
                </div>

                <div className="wait-list">
                    <p className="wait-list-label">待機リスト 0人</p>
                    <div className="wait-list-box"></div>
                </div>

                <div className="button-container">
                    <Button onClick={CancelClick}>キャンセル</Button>
                    <Button onClick={BingoClick}>はじめる</Button>
                </div>
            </div>
        </div>
    )


}

export default StandbyPage;