import React, { useState, useEffect } from "react";
import styles from "./Accounts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, fetchAccounts } from "../../../store/action/userAppStorage";
import { Loader } from "../../common/HomeLoader";
import { Error } from "../../common/Error";
import { useNavigate, useParams } from "react-router-dom";

export const AdminAccountComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useParams();

    const { color } = useSelector(
        state => state.userAuth
    );

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [accountList, setAccountList] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);

    useEffect(() => {

        fetchAllAccounts();

    }, []);

    const fetchAllAccounts = async () => {

        setIsLoading(true);
        setIsError(false);

        const res = await dispatch(fetchAccounts(user));

        if (!res.bool) {

            setIsLoading(false);
            setIsError(true);

            return;

        }

        setAccountList(res.message);
        setFilteredAccounts(res.message);

        setIsLoading(false);

    };

    const editHandler = (id) => {

        navigate(`/new-account/${id}`);

    };

    const deleteHandler = async (id) => {

        setIsLoading(true);
        setIsError(false);

        const res = await dispatch(
            deleteAccount(id)
        );

        if (!res.bool) {

            setIsLoading(false);
            setIsError(true);

            return;

        }

        const updatedAccounts = accountList.filter(
            account => account._id !== id
        );

        setAccountList(updatedAccounts);
        setFilteredAccounts(updatedAccounts);

        setIsLoading(false);

    };

    const searchHandler = (e) => {

        const value = e.target.value.toLowerCase();

        if (!value) {

            setAccountList(filteredAccounts);

            return;

        }

        const results = filteredAccounts.filter(account => {

            const accountType =
                account.accountType?.toLowerCase() || "";

            const accountNumber =
                account.accountNumber?.toLowerCase() || "";

            return (

                accountType.includes(value) ||

                accountNumber.includes(value)

            );

        });

        setAccountList(results);

    };

    const createAccountHandler = () => {

        navigate(`/account-form/${user}`);

    };

    if (isLoading) {

        return <Loader />;

    }

    if (isError) {

        return <Error />;

    }

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

                {/* PAGE HEADER */}

                <div className={styles.pageHeader}>

                    <div>

                        <h1
                            style={{
                                color: color.importantText,
                            }}
                        >
                            Customer Accounts
                        </h1>

                        <p>

                            View, search, edit and manage
                            all bank accounts belonging
                            to this customer.

                        </p>

                    </div>

                    <div className={styles.headerIcon}>

                        <span className="material-icons">
                            account_balance
                        </span>

                    </div>

                </div>

                {/* TOP BAR */}

                <div className={styles.topBar}>

                    <div className={styles.searchBar}>

                        <span className="material-icons">
                            search
                        </span>

                        <input
                            type="text"
                            placeholder="Search by account type or account number..."
                            onChange={searchHandler}
                        />

                    </div>

                    <button
                        className={styles.createButton}
                        onClick={createAccountHandler}
                    >

                        <span className="material-icons">
                            add_circle
                        </span>

                        Create Account

                    </button>

                </div>
                                {/* ACCOUNT TABLE */}

                <div className={styles.tableCard}>

                    <div className={styles.tableHeader}>

                        <div>

                            <h2>Customer Accounts</h2>

                            <p>
                                Manage all available accounts for this customer.
                            </p>

                        </div>

                    </div>

                    {accountList.length === 0 ? (

                        <div className={styles.emptyState}>

                            <span className="material-icons">
                                account_balance_wallet
                            </span>

                            <h3>No Accounts Found</h3>

                            <p>
                                There are currently no accounts available for this customer.
                            </p>

                        </div>

                    ) : (

                        <div className={styles.tableContainer}>

                            <table className={styles.accountTable}>

                                <thead>

                                    <tr>

                                        <th>Account Type</th>

                                        <th>Account Number</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {accountList.map((account) => (

                                        <tr
                                            key={account._id}
                                        >

                                            <td>

                                                <div className={styles.accountType}>

                                                    <span className="material-icons">
                                                        account_balance_wallet
                                                    </span>

                                                    {account.accountType}

                                                </div>

                                            </td>

                                            <td>

                                                {account.accountNumber}

                                            </td>

                                            <td>

                                                <div className={styles.actionButtons}>

                                                    <button
                                                        type="button"
                                                        className={styles.editButton}
                                                        onClick={() =>
                                                            editHandler(account._id)
                                                        }
                                                    >

                                                        <span className="material-icons">
                                                            edit
                                                        </span>

                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={styles.deleteButton}
                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            deleteHandler(account._id);

                                                        }}
                                                    >

                                                        <span className="material-icons">
                                                            delete
                                                        </span>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};