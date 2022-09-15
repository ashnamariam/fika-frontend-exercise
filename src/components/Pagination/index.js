import React from "react";
import './style.css';

const Pagination = ({ setPageNumber, pageNumber }) => {
  return (
    <div className="footer">
      <div className="pagination">
        Page {pageNumber}
        <button
          className="button"
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber((currPage) => currPage - 1);
          }}
        >
          &lt;
        </button>{" "}
        <button
          className="button"
          onClick={() => {
            setPageNumber((currPage) => currPage + 1);
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default Pagination;