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
        <div >
            <Pagination size="lg">
                <Pagination.First value="1" onClick={firstPage}/>
                <Pagination.Prev onClick={previousPage} />

                {displayPageNum.map((num, i) => (
                    <Pagination.Item
                        key={i}
                        className={num === currPage ? "active" : ""}
                        onClick={handlerClickBtn}
                    >
                        {num}
                    </Pagination.Item>
                ))}

                <Pagination.Next onClick={nextPage} />
                <Pagination.Last value={totalPage} onClick={lastPage}/>
            </Pagination>
        </div>
    );
}
