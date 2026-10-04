import React, { useState, useEffect } from "react";
import styles from "./HistoryEdit.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    FiSave,
    FiCreditCard,
    FiCalendar,
    FiDollarSign,
    FiFileText,
    FiHash,
    FiGlobe,
    FiUser,
    FiCheckCircle
} from "react-icons/fi";

export const AdminHistoryEditComponent = ({ updateHandler }) => {

    const [isData, setIsData] = useState(null);

    const { color, historyList } = useSelector(
        state => state.userAuth
    );

    const { id } = useParams();

    // ===========================================
    // FETCH TRANSACTION
    // ===========================================

    useEffect(() => {

        const dataObj = historyList.find(
            data => data._id.toString() === id.toString()
        );

        setIsData(dataObj);

    }, [id, historyList]);

    // ===========================================
    // INPUT HANDLER
    // ===========================================

    const handleChangeHandler = (e, field) => {

        const value = e.target.value;

        setIsData(prev => ({
            ...prev,
            [field]: value
        }));

    };

    // ===========================================
    // SUBMIT
    // ===========================================

    const submitHandler = (e) => {

        e.preventDefault();

        updateHandler(isData);

    };

    if (!isData) return null;

    return (

        <div
            className={styles.homeScreen}
            style={{ backgroundColor: color.background }}
        >

            <div
                className={styles.timeline}
                style={{ backgroundColor: color.background }}
            >

                <form
                    className={styles.editForm}
                    onSubmit={submitHandler}
                >

                    {/* =======================================
                        PAGE HEADER
                    ======================================== */}

                    <div className={styles.pageHeader}>

                        <div>

                            <h2>Edit Transaction</h2>

                            <p>
                                Update transaction details,
                                recipient banking information
                                and transaction status.
                            </p>

                        </div>

                        <button
                            className={styles.updateButtonTop}
                            type="submit"
                        >

                            <FiSave />

                            Save Changes

                        </button>

                    </div>

                    {/* =======================================
                        SUMMARY CARD
                    ======================================== */}

                    <div className={styles.summaryCard}>

                        <div className={styles.summaryLeft}>

                            <h3>
                                {isData.transactionType}
                            </h3>

                            <p>
                                Transaction ID: {isData.id}
                            </p>

                        </div>

                        <div className={styles.summaryRight}>

                            <div className={styles.summaryAmount}>
                                ${isData.amount}
                            </div>

                            <span className={styles.statusBadge}>
                                {isData.status}
                            </span>

                        </div>

                    </div>

                    {/* =======================================
                        BASIC INFORMATION
                    ======================================== */}

                    <div className={styles.formSection}>

                        <h3>

                            <FiFileText />

                            Basic Information

                        </h3>

                        <div className={styles.gridTwo}>

                            <div className={styles.inputGroup}>

                                <label>Transfer ID</label>

                                <div className={styles.inputWrapper}>

                                    <FiHash />

                                    <input
                                        value={isData.id || ""}
                                        readOnly
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Transaction Type</label>

                                <div className={styles.inputWrapper}>

                                    <FiCreditCard />

                                    <input
                                        value={isData.transactionType || ""}
                                        readOnly
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Status</label>

                                <div className={styles.inputWrapper}>

                                    <FiCheckCircle />

                                    <select
                                        value={isData.status}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "status"
                                            )
                                        }
                                    >

                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="Pending">
                                            Pending
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Date Of Transaction</label>

                                <div className={styles.inputWrapper}>

                                    <FiCalendar />

                                    <input
                                        type="date"
                                        value={isData.dateOfTransfer || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "dateOfTransfer"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Amount</label>

                                <div className={styles.inputWrapper}>

                                    <FiDollarSign />

                                    <input
                                        type="number"
                                        value={isData.amount || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "amount"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Reason</label>

                                <div className={styles.inputWrapper}>

                                    <FiFileText />

                                    <input
                                        type="text"
                                        value={isData.reason || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "reason"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Source Account</label>

                                <div className={styles.inputWrapper}>

                                    <FiCreditCard />

                                    <input
                                        value={isData.sourceAccountNumber || ""}
                                        readOnly
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =======================================
                        RECIPIENT INFORMATION
                    ======================================== */}

                    <div className={styles.formSection}>

                        <h3>

                            <FiUser />

                            Recipient Information

                        </h3>

                        <div className={styles.gridTwo}>

                            <div className={styles.inputGroup}>

                                <label>Account Number</label>

                                <div className={styles.inputWrapper}>

                                    <FiCreditCard />

                                    <input
                                        type="number"
                                        value={isData.accountNumber || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "accountNumber"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Route Number</label>

                                <div className={styles.inputWrapper}>

                                    <FiHash />

                                    <input
                                        type="number"
                                        value={isData.routeNumber || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "routeNumber"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Account Name</label>

                                <div className={styles.inputWrapper}>

                                    <FiUser />

                                    <input
                                        type="text"
                                        value={isData.accountName || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "accountName"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Bank Name</label>

                                <div className={styles.inputWrapper}>

                                    <FiCreditCard />

                                    <input
                                        type="text"
                                        value={isData.nameOfBank || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "nameOfBank"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Country</label>

                                <div className={styles.inputWrapper}>

                                    <FiGlobe />

                                    <input
                                        type="text"
                                        value={isData.nameOfCountry || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "nameOfCountry"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =======================================
                        FOOTER BUTTON
                    ======================================== */}

                    <div className={styles.buttonContainer}>

                        <button
                            type="submit"
                            className={styles.updateButton}
                        >

                            <FiSave />

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};
