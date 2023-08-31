/* BoardFreeUpdate.js */
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function BoardFreeUpdate() {
    const navigate = useNavigate();
    const {idx} = useParams(); // /update/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [board, setBoard] = useState({
        idx: 0,
        title: '',
        createdBy: '',
        contents: '',
    });

    const {title, createdBy, contents} = board; //비구조화 할당
    const [showModal, setShowModal] = useState(false);

    const onChange = (event) => {
        const {value, name} = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const getBoard = async () => {
        const resp = await (await axios.get(`//localhost:9090/board/${idx}`)).data;
        setBoard(resp.data);
    };

    const updateBoard = async () => {
        if (title === '' || contents==='') {
            setShowModal(true);
            return;
        }
        await axios.patch(`//localhost:9090/board`, board).then((res) => {
            alert('수정되었습니다.');
            navigate('/board/' + idx);
        });
    };

    const backToDetail = () => {
        navigate('/board/' + idx);
    };

    useEffect(() => {
        getBoard();
    }, []);
    const closeModal = () => {
        setShowModal(false); // 모달 닫기
    };

    return (
        <div>
            <NavSetting/>
            <div  className="board_free_update_title  "><h2>글쓰기</h2></div>
            <div>
                <InputGroup className="container w-50 board_free_update_title">
                    <Form.Control name="title"  placeholder="제목"
                                  value={title} onChange={onChange}/>
                </InputGroup>
            </div>
            <div>
                <InputGroup className="container w-50 board_free_update_createdBy">
                    <Form.Control name="createdBy"  placeholder="작성자"
                                  value={createdBy} onChange={onChange} disabled="false"/>
                </InputGroup>
            </div>
            <InputGroup className="container w-50 board_free_update_contents disabled">
                <Form.Control className="board_free_update_form" name="contents" as="textarea"
                              placeholder="내용"
                              value={contents} onChange={onChange}
                              cols="30"
                              rows="10"   />
            </InputGroup>
            <div className="board_free_update_button">
                <button className="btn btn-success board_free_update_buttons" onClick={updateBoard}>수정</button>
                <button className="btn btn-danger board_free_update_buttons" onClick={backToDetail}>취소</button>
            </div>
            <Footer/>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>경고</Modal.Title>
                </Modal.Header>
                <Modal.Body>제목과 내용은 필수 입력 사항입니다.</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={closeModal}>확인</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

