/* BoardFree.js */
import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import "../styles/BoardFreeList.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


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
            <div>
            <div className="container board_free_detail w-50 ">
                <div className="board_free_table">
                <div className="row row-cols-auto">
                    <h2 className="board_free_title" >{title}</h2>
                </div>
                <div className="fw-bold row row-cols-auto">
                    <h5 className="board_free_createdby">{createdBy}</h5>
                </div>
                <div className="row row-cols-auto">
                    <p className="board_free_createdat">{formatDate(createdAt)}</p>
                </div>
                </div>
                <div className="row row-cols-auto board_free_contents ">
                     <p className="content-box text-left board_free_contents_white">{contents}</p>
                </div>
            </div>
                <InputGroup className="container w-50">
                    <Form.Control
                        placeholder="댓글을 적어주세요"/>
                    <Button variant="outline-secondary" id="button-addon2">
                        등록
                    </Button>
                </InputGroup>
                <div className=" board_free_contents_button ">
                    <button className="btn btn-success board_free_contents_buttons" onClick={moveToUpdate}>수정</button>
                    <button className="btn btn-danger board_free_contents_buttons" onClick={deleteBoard}>삭제</button>
                    <button className="btn btn-warning board_free_contents_buttons" onClick={moveToList}>목록</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

