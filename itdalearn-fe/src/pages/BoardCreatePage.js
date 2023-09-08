
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import BoardService from '../api/BoardService';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from '../common/Footer';
import NavSetting from '../common/Nav';
import jwt_decode from 'jwt-decode';

const BoardCreateComponent = () => {
    const { bno } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        bno: '',
        type: 1,
        title: '',
        contents: ''
     
    });
    const { type,title, contents,memberNo} = state;



    const createBoard = (event) => {
        event.preventDefault();

        if (state.title === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        if (state.memberNo === "") {
            alert("작성자를 입력해주세요.");
            return;
        }

        if (state.contents === "") {
            alert("내용을 입력해주세요.");
            return;
        }

        // 변경된 부분
        let token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
         let decodedToken = jwt_decode(token);      // JWT 토큰 디코드하기

         let newBoard = {...state};
         newBoard.memberNo = decodedToken.username;   // 현재 로그인한 사용자의 이름 설정

          console.log("board => " + JSON.stringify(newBoard));

          if (bno === '_create') {
              BoardService.createBoard(newBoard).then(() => {   // newBoard 전송
                  navigate('/board');
              });
          } else {
              BoardService.updateBoard(bno, newBoard).then(() => {   // newBoard 전송
                  navigate('/board');
              });
          }
      };



    const getTitle = () => {
        if (bno === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>;
        } else {
            return <h3 className="text-center">{bno}글을 수정 합니다.</h3>;
        }
    };
    useEffect(() => {
        if (bno !== '_create') {
            BoardService.getOneBoard(bno).then((res) => {
                const { type, title, contents, memberNo } = res.data;
                setState((prevState) => ({ ...prevState, type, title, contents, memberNo }));
            });
        }
      }, [bno]);
      
      useEffect(() => {
        console.log("board => " + JSON.stringify(state));
      }, [state]);
      
    const changeTypeHandler = (event) => {
        setState({ ...state, type: event.target.value });
    };

    const changeTitleHandler = (event) => {
        setState({ ...state, title: event.target.value });
    };

    const changeContentsHandler = (event) => {
        setState({ ...state, contents: event.target.value });
    };



    const cancel = () => {
        navigate('/board');
    };

    return (
        <div>
            <NavSetting/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Type </label>
                                    <select placeholder="type" name="type" className="form-control"
                                            value={state.type} onChange={changeTypeHandler}>
                                        <option value="1">자유게시판</option>
                                        <option value="2">질문과 답변</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Title </label>
                                    <input type="text" placeholder="title" name="title" className="form-control"
                                           value={state.title} onChange={changeTitleHandler}/>
                                </div>
                                <div className="form-group">
                                    <label> Contents </label>
                                    <textarea placeholder="contents" name="contents" className="form-control"
                                              value={state.contents} onChange={changeContentsHandler}/>
                                </div>
                                
                                <button type="submit" className="btn btn-success" onClick={createBoard}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default BoardCreateComponent;
