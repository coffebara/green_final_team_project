import axios from 'axios';


const BOARD_API_BASE_URL = "http://localhost:9090/board";

class BoardService {


    getBoards() {
        return axios.get(BOARD_API_BASE_URL);
    }
}

export default new BoardService();