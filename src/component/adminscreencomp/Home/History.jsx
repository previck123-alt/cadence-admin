import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../../store/action/userAppStorage";
import { Loader } from "../../common/HomeLoader";
import { Error } from "../../common/Error";
import { useNavigate, useParams } from "react-router-dom";

export const AdminHistoryComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [historyList, setHistoryList] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useParams();

    const { color } = useSelector(
        state => state.userAuth
    );

    useEffect(() => {

        fetchAllHistory();

    }, []);

    const fetchAllHistory = async () => {

        setIsError(false);

        const res = await dispatch(
            fetchHistory(user)
        );

        if (!res.bool) {

            setIsError(true);
            setIsLoading(false);

            return;

        }

        setHistoryList(res.message);
        setFilteredHistory(res.message);

        setIsLoading(false);

    };

    const searchHandler = (e) => {

        const value = e.target.value.toLowerCase();

        if (!value) {

            setHistoryList(filteredHistory);

            return;

        }

        const newData = filteredHistory.filter(item =>

            item.id?.toLowerCase().includes(value)

        );

        setHistoryList(newData);

    };

    const navigateHandler = (id) => {

        navigate(`/transaction/${id}`);

    };

    if (isLoading) return <Loader />;

    if (isError) return <Error />;

    const successfulTransactions =
        historyList.filter(
            item =>
                item.status?.toLowerCase() === "approved" ||
                item.status?.toLowerCase() === "success"
        ).length;

    return (

        <div
            className={styles.homeScreen}
            style={{
                backgroundColor: color.background,
            }}
        >

            <div
                className={styles.timeline}
                style={{
                    backgroundColor: color.background,
                }}
            >

                {/*==========================================
                    PAGE HEADER
                ==========================================*/}

                <div className={styles.pageHeader}>

                    <div>

                        <h1
                            style={{
                                color: color.importantText,
                            }}
                        >
                            Transaction History
                        </h1>

                        <p>

                            View every transaction completed by
                            this customer, including deposits,
                            withdrawals, transfers and investment
                            activities.

                        </p>

                    </div>

                    <div className={styles.headerIcon}>

                        <span className="material-icons">
                            history
                        </span>

                    </div>

                </div>

                {/*==========================================
                    STATISTICS
                ==========================================*/}

                <div className={styles.statsGrid}>

                    <div className={styles.statCard}>

                        <span className="material-icons">
                            receipt_long
                        </span>

                        <div>

                            <h2>

                                {historyList.length}

                            </h2>

                            <p>

                                Total Transactions

                            </p>

                        </div>

                    </div>

                    <div className={styles.statCard}>

                        <span className="material-icons">
                            task_alt
                        </span>

                        <div>

                            <h2>

                                {successfulTransactions}

                            </h2>

                            <p>

                                Successful Transactions

                            </p>

                        </div>

                    </div>

                </div>

                {/*==========================================
                    SEARCH
                ==========================================*/}

                <div className={styles.filter}>

                    <div className={styles.searchContainer}>

                        <div className={styles.searchBar}>

                            <span className="material-icons">
                                search
                            </span>

                            <input
                                className={styles.input}
                                placeholder="Search transaction ID..."
                                onChange={searchHandler}
                            />

                        </div>

                    </div>

                </div>

                {/*==========================================
                    TABLE
                ==========================================*/}

                <div className={styles.tableContainer}>
                                        {historyList.length === 0 ? (

                        <div className={styles.emptyContainer}>

                            <span className="material-icons">
                                receipt_long
                            </span>

                            <h3>
                                No Transactions Found
                            </h3>

                            <p>
                                There are currently no transactions
                                matching your search.
                            </p>

                        </div>

                    ) : (

                        <table className={styles.dataTable}>

                            <thead>

                                <tr>

                                    <th>Transaction ID</th>

                                    <th>Date</th>

                                    <th>Amount</th>

                                    <th>Status</th>

                                    <th>Transaction Type</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {historyList.map((data) => (

                                    <tr
                                        key={data._id}
                                    >

                                        <td>

                                            <div className={styles.transactionId}>

                                                <span className="material-icons">
                                                    fingerprint
                                                </span>

                                                {data.id}

                                            </div>

                                        </td>

                                        <td>

                                            <div className={styles.transactionDate}>

                                                <span className="material-icons">
                                                    calendar_today
                                                </span>

                                                {data.date?.substring(0, 10)}

                                            </div>

                                        </td>

                                        <td>

                                            <span className={styles.amount}>

                                                $
                                                {Number(
                                                    data.amount || 0
                                                ).toLocaleString()}

                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    data.status?.toLowerCase() === "approved" ||
                                                    data.status?.toLowerCase() === "success"
                                                        ? styles.successBadge
                                                        : data.status?.toLowerCase() === "pending"
                                                            ? styles.pendingBadge
                                                            : styles.failedBadge
                                                }
                                            >

                                                {data.status}

                                            </span>

                                        </td>

                                        <td>

                                            <span className={styles.typeBadge}>

                                                {data.transactionType}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className={styles.actionButton}
                                                onClick={() =>
                                                    navigateHandler(data._id)
                                                }
                                            >

                                                <span className="material-icons">
                                                    visibility
                                                </span>

                                                View Details

                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        </div>

    );

};