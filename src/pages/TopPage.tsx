import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import '../styles/TopPage.css';


const TopPage: React.FC = () => {

    const navigate = useNavigate();

    const stanbyClick = () => {
        navigate('/standby')
    }

    const joinClick = () => {
        navigate('/JoinPage')
    }
    return (
        <div className="topPageContainer">
            <div className="TopPageCard">
                <h1 className="topPageTitle">びんごどん！</h1>
                <p className="description">「びんごどん！」は3✖︎3マスに「質問」が並んでおり、ルーレットで当たった「質問」の<br />
                    マスをあけ、縦・横・斜めのいずれか一列を揃えるゲームです。
                </p>
                <p className="description">
                    ルーレットで当たった「質問」をカードに記載されている人が「質問」に答えます。<br />
                    ただ、「質問」に答えたからと言って、必ずしもマスがあくとは限りません。
                </p>
                <p className="description">
                    その「質問」が「良かったかどうか」の投票を全体に取り、「良かった！」と<br />
                    判断された人のカードのみ、マスがあきます。
                </p>
                <div className="button-container">
                    <Button onClick={stanbyClick}>ルームを作成</Button>
                    <Button onClick={joinClick}>ルームに参加</Button>
                </div>
            </div>
        </div>
    )
}

export default TopPage;