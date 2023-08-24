/* BoardFree.js */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import "../styles/BoardFreeList.css"

export default function BoardFree({idx, title, contents, createdBy, createdAt}) {
    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/update/' + idx);
    };

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:9090/board/${idx}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    };

    const moveToList = () => {
        navigate('/board');
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1, padStart로 2자리로 맞추기
        const day = String(date.getDate()).padStart(2, '0'); // padStart로 2자리로 맞추기
        return `${year}.${month}.${day}`;
    };

    return (
        <div>
            <NavSetting/>
            <div className="container board_detail w-50 ">
                <div className="board_detail_main2">
                    <h2>{title}</h2>
                </div>
                    <span className="fw-bold">{createdBy}</span>
                    <p>{formatDate(createdAt)}</p>
                    <div className="board_detail_main">
                        <p>{contents}</p>

                </div></div>
                <div>
                    <button onClick={moveToUpdate}>수정</button>
                    <button onClick={deleteBoard}>삭제</button>
                    <button onClick={moveToList}>목록</button>

            </div>
            <Footer/>
        </div>
    );
};

