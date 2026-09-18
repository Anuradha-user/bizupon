import React, { useEffect, useState } from "react";
import {
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";

const Table = ({
    columns = [],
    data = [],
    loading = false,
    itemsPerPage = 5,
    emptyMessage = "No Data Found",
    rowKey = "id",
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = data.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="table-responsive">
            <table
                className="table reusable-table table-bordered border-bottom align-middle mb-0"
                style={{ fontSize: "13px" }}
            >
                {/* TABLE HEADER */}
                <thead
                    style={{
                        backgroundColor: "#fdfdfd",
                        color: "#070707",
                        fontSize: "11px",
                        letterSpacing: "0.5px",
                    }}
                >
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={column.key || index}
                                className={column.headerClassName || ""}
                                style={{
                                    ...(column.style || {}),
                                }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                    {/* LOADING */}
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4"
                            >
                                <div
                                    className="spinner-border spinner-border-sm text-primary me-2"
                                    role="status"
                                ></div>

                                Loading...
                            </td>
                        </tr>
                    ) : currentItems.length > 0 ? (
                        currentItems.map((item, index) => {
                            const absoluteIndex =
                                indexOfFirstItem + index;

                            return (
                                <tr
                                    key={
                                        item[rowKey] ||
                                        item.id ||
                                        absoluteIndex
                                    }
                                >
                                    {columns.map(
                                        (column, columnIndex) => (
                                            <td
                                                key={
                                                    column.key ||
                                                    columnIndex
                                                }
                                                className={
                                                    column.className || ""
                                                }
                                                style={{
                                                    ...(column.tdStyle || {}),
                                                }}
                                            >
                                                {column.render
                                                    ? column.render(
                                                          item,
                                                          index,
                                                          absoluteIndex
                                                      )
                                                    : item[
                                                          column.key
                                                      ] ?? "N/A"}
                                            </td>
                                        )
                                    )}
                                </tr>
                            );
                        })
                    ) : (
                        /* NO DATA */
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4 text-muted"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
            {!loading && data.length > 0 && (
                <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                    <small className="text-muted">
                        Showing {indexOfFirstItem + 1} to{" "}
                        {Math.min(
                            indexOfLastItem,
                            data.length
                        )}{" "}
                        of {data.length} entries
                    </small>

                    <ul className="pagination pagination-sm mb-0">
                        {/* PREVIOUS */}
                        <li
                            className={`page-item ${
                                currentPage === 1
                                    ? "disabled"
                                    : ""
                            }`}
                        >
                            <button
                                className="page-link border-0"
                                onClick={() =>
                                    handlePageChange(
                                        currentPage - 1
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                <IconChevronLeft size={16} />
                            </button>
                        </li>

                        {/* PAGE NUMBERS */}
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNumber = i + 1;

                            return (
                                <li
                                    key={pageNumber}
                                    className={`page-item ${
                                        currentPage === pageNumber
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className={`page-link mx-1 rounded ${
                                            currentPage === pageNumber
                                                ? "bg-primary text-white"
                                                : "text-dark"
                                        }`}
                                        onClick={() =>
                                            handlePageChange(
                                                pageNumber
                                            )
                                        }
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}

                        {/* NEXT */}
                        <li
                            className={`page-item ${
                                currentPage === totalPages
                                    ? "disabled"
                                    : ""
                            }`}
                        >
                            <button
                                className="page-link border-0"
                                onClick={() =>
                                    handlePageChange(
                                        currentPage + 1
                                    )
                                }
                                disabled={
                                    currentPage === totalPages
                                }
                            >
                                <IconChevronRight size={16} />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Table;