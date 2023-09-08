import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import BoardService from '../api/BoardService';
import "bootstrap/dist/css/bootstrap.min.css";
import NavSetting from '../common/Nav';
import Footer from '../common/Footer';
import jwt_decode from 'jwt-decode';

const BoardReadComponent = () => {
    const {bno} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    const [replyContent, setReplyContent] = useState("");
    const [replies, setReplies] = useState([]);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    const token = localStorage.getItem('token');
    let decodedToken;
    
    if (token) {
      decodedToken = jwt_decode(token);
    }

    useEffect(() => {
        let isMounted = true;

        BoardService.getOneBoard(bno).then((res) => {
            if (isMounted && res && res.data) { // 배열 체크 제거
                setBoard(res.data);
            }
        });

        loadReplies();

        return () => {
            isMounted = false;
        };
    }, [bno]);

    const loadReplies = async () => {
        try {
            const response = await BoardService.getReplies(bno);

            if (!Array.isArray(response)) { // 응답 데이터가 배열이 아닐 경우
                console.error('Invalid response:'+response, response);
                return;
            }

            setReplies(response); // 응답 데이터가 배열일 경우 state 업데이트
        } catch (error) {
            console.error('Error:', error); // 오류 발생 시 오류 메시지 출력
        }
    };


    const addReply = async () => {
        if (replyContent === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        try {
            // 서버에 요청 보내기
            await BoardService.addReply(bno, replyContent);

            // 성공적으로 등록한 후에는 다시 불러옵니다.
            await loadReplies();

            setReplyContent("");
        } catch (error) {
            console.error("댓글 등록 에러: " + error);
        }
    };



    const returnBoardType = (typeNo) => {
        let type = null;
        if (typeNo === 1) {
            type = "자유게시판";
        } else if (typeNo === 2) {
            type = "질문과 답변 게시판";
        } else {
            type = "타입 미지정";
        }

        return (
            <div className="row">
                <label> Board Type : </label> {type}
            </div>
        );
    };

    const returnDate = (cTime, uTime) => {
        return (
            <div className="row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        );
    };

    const goToList = () => {
        navigate('/board');
    };
    const goToUpdate = (event) => {
        event.preventDefault();
        navigate(`/board/write/${board.bno}`);
    }
    const deleteView = async () => {
        if (window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            try {
                const response = await BoardService.deleteBoard(board.bno);
                console.log("delete result => " + JSON.stringify(response));
                if (response.status === 200) {
                    navigate('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            } catch (error) {
                console.error("글 삭제 에러: " + error);
            }
        }
    }


    const startEditing = (cno) => {
        const replyToEdit = replies.find(reply => reply.cno === cno);
        if (replyToEdit) {
            setEditedContent(replyToEdit.content);
            setEditingReplyId(cno);
            console.log('startEditing called with cno:', cno);
        }
    };

    const cancelEditing = () => {
        setEditedContent("");
        setEditingReplyId(null);
        console.log('cancelEditing called');
    };

    const applyChanges = async () => {
        try {
            await BoardService.updateReply(bno, editingReplyId, editedContent);

            await loadReplies();

            cancelEditing();
        } catch (error) {
            console.error("댓글 수정 에러: " + error);
        }
        console.log('applyChanges called');
    };


    const deleteReply = async (cno) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) {
            return;
        }

        try {
            await BoardService.deleteReply(bno, cno);

            // 성공적으로 삭제한 후에는 다시 불러옵니다.
            await loadReplies();
            alert("댓글이 삭제되었습니다.");
        } catch (error) {
            console.error("댓글 삭제 에러: " + error);
        }
        console.log('deleteReply called with cno:', cno);
    };



    return (
        <div>
            <NavSetting/>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Read Detail</h3>
                <div className="card-body">
                    {returnBoardType(board.type)}
                    <div className="row">
                        <label> Title </label> : {board.title}
                    </div>
                    <div className="row">
                        <label> Contents </label><div className='tt'> : {board.contents}</div><br></br>

                    </div>
                    <div className="row">
                        <label> MemberNo </label>:
                        {board.memberNo}
                    </div>
                    {returnDate(board.createdTime, board.updatedTime)}


                    <div className="card-body">
                        {/* ... */}
                        <div className="card mb-2 mt-5">
                            <div className="card-header bg-light">
                                <i className="fa fa-comment fa"></i> Comment
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                   {replies.map((reply) =>
            decodedToken.username === reply.memberNo ? (
                editingReplyId === reply.cno ? (
                    <li key={reply.cno} className="list-group-item">
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                        <button type='button' onClick={applyChanges}>적용</button>
                        <button type='button' onClick={cancelEditing}>취소</button>
                    </li>
                ) : (
                    <li key={reply.id} className="list-group-item">{reply.content}
                        <button type='button' onClick={() => startEditing(reply.cno)}>수정</button>
                        <button type='button' onClick={() => deleteReply(reply.cno)}>삭제</button>
                    </li>
                )
            ) : (
                // 사용자가 작성하지 않은 댓글에 대해서는 수정/삭제 버튼 없이 내용만 출력합니다.
                <li key={reply.id} className="list-group-item"><div>{reply.cno}번</div><div>{reply.content}</div>
                <div>작성자 : {board.memberNo}</div></li>
                
            )
        )}
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder='Write your comment here...'
                                    />
                                    <button type='button' onClick={addReply}>Submit</button>
                                </ul>
                            </div>
                        </div>
                    <button className="btn btn-primary" onClick={goToList} style={{marginLeft: "10px"}}>
                        글 목록으로 이동
                    </button>
                    {board.memberNo === decodedToken.username && ( <button className="btn btn-info" onClick={goToUpdate} style={{marginLeft: "10px"}}>글 수정</button>
)}
                   {board.memberNo === decodedToken.username && ( <button className="btn btn-danger" onClick={deleteView} style={{marginLeft: "10px"}}>글 삭제
                    </button>)}
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    );

}


export default BoardReadComponent;
