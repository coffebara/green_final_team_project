import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BoardFree from "./BoardFree";


export default function BoardFreeDetail() {
    const { idx } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const resp = await (await axios.get(`//localhost:9090/board/${idx}`)).data;
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <BoardFree
                    idx={board.idx}
                    title={board.title}
                    contents={board.contents}
                    createdBy={board.createdBy}
                    createdAt={board.createdAt}
                />
            )}
        </div>
    );
}


