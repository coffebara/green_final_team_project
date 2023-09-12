import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardService from "../api/BoardService";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSetting from "../common/Nav";
import Footer from "../common/Footer";
import jwt_decode from "jwt-decode";
import "../styles/Reply.css";

const BoardReadComponent = () => {
  const { bno } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState({});
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [replyMemberNo, setReplyMemberNo] = useState("");

  const token = localStorage.getItem("token");
  let decodedToken;

  if (token) {
    decodedToken = jwt_decode(token);
  }

  useEffect(() => {
    let isMounted = true;

    BoardService.getOneBoard(bno).then((res) => {
      if (isMounted && res && res.data) {
        // 배열 체크 제거
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

      if (!Array.isArray(response)) {
        // 응답 데이터가 배열이 아닐 경우
        console.error("Invalid response:" + response, response);
        return;
      }

      setReplies(response); // 응답 데이터가 배열일 경우 state 업데이트
    } catch (error) {
      console.error("Error:", error); // 오류 발생 시 오류 메시지 출력
    }
  };

  const addReply = async () => {
    if (replyContent === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 서버에 요청 보내기
      await BoardService.addReply(bno, replyContent, decodedToken.username); // username 추가

      // 성공적으로 등록한 후에는 다시 불러옵니다.
      await loadReplies();

      setReplyContent("");
    } catch (error) {
      console.error("댓글 등록 에러: " + error);
    }
  };

  const goToList = () => {
    navigate("/board");
  };
  const goToUpdate = (event) => {
    event.preventDefault();
    navigate(`/board/write/${board.bno}`);
  };
  const deleteView = async () => {
    if (
      window.confirm(
        "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
      )
    ) {
      try {
        const response = await BoardService.deleteBoard(board.bno);
        console.log("delete result => " + JSON.stringify(response));
        if (response.status === 200) {
          navigate("/board");
        } else {
          alert("글 삭제가 실패했습니다.");
        }
      } catch (error) {
        console.error("글 삭제 에러: " + error);
      }
    }
  };

  const startEditing = (cno) => {
    const replyToEdit = replies.find((reply) => reply.cno === cno);
    if (replyToEdit) {
      setEditedContent(replyToEdit.content);
      setEditingReplyId(cno);
      console.log("startEditing called with cno:", cno);
    }
  };

  const cancelEditing = () => {
    setEditedContent("");
    setEditingReplyId(null);
    console.log("cancelEditing called");
  };

  const applyChanges = async () => {
    try {
      await BoardService.updateReply(bno, editingReplyId, editedContent);

      await loadReplies();

      cancelEditing();
    } catch (error) {
      console.error("댓글 수정 에러: " + error);
    }
    console.log("applyChanges called");
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
    console.log("deleteReply called with cno:", cno);
  };
const goToLogin=()=>{
    navigate("/members/login");
};

  return (
    <div>
      <NavSetting />
      <div className="card col-md-6 offset-md-3 mt-3 mb-3 board_setting">
        <h3 className="board_title_setting ms-4 mt-3">{board.title}</h3>
        <div className="card-body">
          <div className="card mb-2 ">
            <div className="card-header bg-light board_read_title">
              <h5>{board.memberNo}</h5>
            </div>
            <div className="card-body board_read_content">{board.contents}</div>
            <div className="mb-3">
              작성일 : {new Date(board.createdTime).toLocaleDateString()} 수정일
              : {new Date(board.updatedTime).toLocaleDateString()}{" "}
            </div>
          </div>
          <div className="card-body">
            <div className="card mb-2">
              <div className="card-header bg-light">
                <i className="fa fa-comment fa"></i> 댓글
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {replies.map((reply) =>
                    decodedToken && decodedToken.username === reply.memberNo ? (
                      editingReplyId === reply.cno ? (
                        <li key={reply.cno} className="list-group-item">
                          <div>
                            <textarea
                              className="reply_content_textarea"
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                            />
                          </div>
                          <button
                            className="btn btn-success btn-sm m-1"
                            type="button"
                            onClick={applyChanges}
                          >
                            적용
                          </button>
                          <button
                            className="btn btn-danger btn-sm m-1"
                            type="button"
                            onClick={cancelEditing}
                          >
                            취소
                          </button>
                        </li>
                      ) : (
                        <div className="mb-1">
                          <li key={reply.id} className="list-group-item">
                            <div className="reply_member">
                              {" "}
                              <h4>{reply.memberNo}</h4>
                            </div>
                            <div className="reply_textarea">
                              {reply.content}
                            </div>
                            <button
                              className="btn btn-success btn-sm m-1"
                              type="button"
                              onClick={() => startEditing(reply.cno)}
                            >
                              수정
                            </button>
                            <button
                              className="btn btn-danger btn-sm m-1"
                              type="button"
                              onClick={() => deleteReply(reply.cno)}
                            >
                              삭제
                            </button>
                          </li>
                        </div>
                      )
                    ) : (
                      <div className="mb-1">
                        <li key={reply.id} className="list-group-item">
                          <div className="reply_member">
                            <h4>{reply.memberNo}</h4>
                          </div>
                          <div className="reply_textarea">{reply.content}</div>
                        </li>
                      </div>
                    )
                  )}

                  {decodedToken?.username ? (
                    <>
                      <textarea
                        className="reply_content_textarea"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder=" 댓글을 작성해주세요"
                      />
                      <button
                        type="button"
                        onClick={addReply}
                        className="btn btn-primary btn-sm mt-2"
                      >
                        댓글 작성
                      </button>
                    </>
                  ) : (
                    <>
                      <textarea
                        className="reply_content_textarea"
                        placeholder=" 로그인 후 작성가능합니다"
                        disabled
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-2"
                        onClick={goToLogin}
                      >
                        로그인 화면으로 이동
                      </button>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <button
              className="btn btn-info btn-sm mt-3 ms-1 me-1"
              onClick={goToList}
            >
              글 목록으로 이동
            </button>
            {decodedToken && board.memberNo === decodedToken.username && (
              <button
                className="btn btn-warning btn-sm mt-3 ms-1 me-1"
                onClick={goToUpdate}
              >
                글 수정
              </button>
            )}
            {decodedToken && board.memberNo === decodedToken.username && (
              <button
                className="btn btn-danger btn-sm mt-3 ms-1 me-1"
                onClick={deleteView}
              >
                글 삭제
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BoardReadComponent;
