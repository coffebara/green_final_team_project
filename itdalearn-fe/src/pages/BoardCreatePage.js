
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import BoardService from '../api/BoardService';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from '../common/Footer';
import NavSetting from '../common/Nav';
import jwt_decode from 'jwt-decode';
import "../styles/Board.css";

const BoardCreateComponent = () => {
    const { bno } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        bno: '',
        title: '',
        contents: ''
     
    });
    const { title, contents,memberNo} = state;



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

    
        let token = localStorage.getItem('token'); 
         let decodedToken = jwt_decode(token);     
         let newBoard = {...state};
         newBoard.memberNo = decodedToken.username;  
          console.log("board => " + JSON.stringify(newBoard));

          if (bno === '_create') {
              BoardService.createBoard(newBoard).then(() => {  
                  navigate('/board');
              });
          } else {
              BoardService.updateBoard(bno, newBoard).then(() => {   
                  navigate('/board');
              });
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
            <div className="container mt-3 mb-3 board_setting">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                   
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> 제목 </label>
                                    <input type="text" placeholder="제목을 입력해주세요" name="title" className="form-control mt-2 mb-2"
                                           value={state.title} onChange={changeTitleHandler}/>
                                </div>
                                <div className="form-group ">
                                    <label> 내용 </label>
                                    <textarea placeholder="내용을 입력해주세요" name="contents" className="form-control create_board_textarea mt-2 mb-2"
                                              value={state.contents} onChange={changeContentsHandler}/>
                                </div>
                                <div className='mt-3'>
                                <button type="submit" className="btn btn-success" onClick={createBoard}>저장</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>취소</button>
                                </div>
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
