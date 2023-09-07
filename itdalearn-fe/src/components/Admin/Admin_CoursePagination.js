import { Pagination } from "react-bootstrap";

export default function Admin_CoursePagination({
    previousPage,
    nextPage,
    handlerClickBtn,
    currPage,
    displayPageNum,
    firstPage,
    lastPage,
    totalPage
}) {

    return (
        <div>
            <Pagination size="lg" style={{padding: "auto"}}>
                <Pagination.First value="1" onClick={firstPage}/>
                <Pagination.Prev onClick={previousPage} style={{display: totalPage<=10?"none":""}}/>

                {displayPageNum.map((num, i) => (
                    <Pagination.Item
                        key={i}
                        className={num === currPage ? "active" : ""}
                        onClick={handlerClickBtn}
                    >
                        {num}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={nextPage} style={{display: totalPage<=10?"none":""}}/>
                <Pagination.Last value={totalPage} onClick={lastPage}/>
            </Pagination>
        </div>
    );
}
