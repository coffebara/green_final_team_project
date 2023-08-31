/* BoardWrite.js */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import Modal from 'react-bootstrap/Modal';


export default function BoardFreeWrite() {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        contents: '',
    });
    const [showModal, setShowModal] = useState(false);

    const {title, createdBy, contents} = board;

    const onChange = (event) => {
        const {value, name} = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        if (title === '' || createdBy === ''||contents==='') {
            setShowModal(true);
            return;
        }
        await axios.post(`//localhost:9090/board`, board).then((res) => {
            alert('등록되었습니다.');
            navigate('/board');
        });
    };

    const backToList = () => {
        navigate('/board');
    };

    const closeModal = () => {
        setShowModal(false); // 모달 닫기
    };


    return (
        <div>
            <NavSetting/>
            <div  className="board_free_list_title  "><h2>글쓰기</h2></div>
            <div>
                <InputGroup className="container w-50 board_free_write_title">
                    <Form.Control name="title"  placeholder="제목"
                                  value={title} onChange={onChange}/>
                </InputGroup>
            </div>
            <div>
                <InputGroup className="container w-50 board_free_write_createdBy">
                    <Form.Control name="createdBy"  placeholder="작성자"
                                  value={createdBy} onChange={onChange}/>
                </InputGroup>
            </div>
            <div className="detail_content" >
            <InputGroup className="container w-50 board_free_write_contents">
                <Form.Control  className="board_free_write_form" name="contents" as="textarea"
                              placeholder="내용"
                              value={contents} onChange={onChange}
                              cols="30"
                              rows="10"/>

            </InputGroup>

            </div>
            <div className="board_free_write_button">
                <button className="btn btn-success board_free_write_buttons" onClick={saveBoard}>저장</button>
                <button className="btn btn-danger board_free_write_buttons" onClick={backToList}>취소</button>
            </div>
            <Footer/>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>경고</Modal.Title>
                </Modal.Header>
                <Modal.Body>제목과 작성자, 내용은 필수 입력 사항입니다.</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={closeModal}>확인</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

