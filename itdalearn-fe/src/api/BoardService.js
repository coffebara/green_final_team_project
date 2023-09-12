import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BOARD_API_BASE_URL = "http://localhost:9090/board";


class BoardService {
    getBoards(pageNum, size = 10, sort = 'bno', direction = 'desc') {
        return axios.get(BOARD_API_BASE_URL + '?page=' + pageNum + '&size=' + size + '&sort=' + sort + ',' + direction,{
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
    }


    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board,{
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
    }

    getOneBoard(bno) {
        return axios.get(BOARD_API_BASE_URL + "/" + bno);
    }

    updateBoard(bno, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + bno, board);
    }

    deleteBoard(bno) {
        return axios.delete(BOARD_API_BASE_URL + "/" + bno);
    }

    searchBoards(pageNum, searchType, searchKeyword) {

        return axios.get(
            `${BOARD_API_BASE_URL}/search?page=${pageNum}&type=${encodeURIComponent(searchType)}&keyword=${encodeURIComponent(searchKeyword)}&sort=bno,desc`
        
            );
    }
    
    

    getReplies(bno) {
        return axios.get(BOARD_API_BASE_URL + "/" + bno + "/replies")
            .then(response => {
                console.log("오류가 없으면: " + response, response);
                if (Array.isArray(response.data)) { // 응답 데이터가 배열인지 확인
                    return response.data;
                } else {
                    throw new Error('Unexpected response data format'); // 배열이 아니면 오류 발생시킴
                }
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }


    addReply(bno, content, username) {
        return axios.post(BOARD_API_BASE_URL + "/" + bno + "/replies", {content, memberNo: username});
    }
    

    updateReply(boardNo, replyId, content) {
        return axios.put(`${BOARD_API_BASE_URL}/${boardNo}/replies/${replyId}`, {content});
    }


    deleteReply(boardNo, replyId) {
        return axios.delete(`${BOARD_API_BASE_URL}/${boardNo}/replies/${replyId}`);
    }
}

export default new BoardService();