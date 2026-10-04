import React, { useState, useEffect } from "react";
import styles from "./AdminCredit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAccounts } from "../../../store/action/userAppStorage";
import { Loader } from "../../common/HomeLoader";
import { Error } from "../../common/Error";

export const AdminCreditComponent = ({ updateHandler }) => {
    const { color, usersList } = useSelector(
        (state) => state.userAuth
    );

    const dispatch = useDispatch();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [userAccount, setUserAccount] = useState([]);
    const [isCurrentUser, setIsCurrentUser] = useState(null);
    const [isCurrentAccount, setIsCurrentAccount] = useState(null);

    const [isEmail, setIsEmail] = useState("");
    const [isAmount, setIsAmount] = useState("");
    const [isReason, setIsReason] = useState("");
    const [isDate, setIsDate] = useState("");

    const fetchAllAccounts = async (user) => {
        if (!user) return;

        setIsLoading(true);
        setIsError(false);

        const res = await dispatch(fetchAccounts(user._id));

        if (!res.bool) {
            setIsLoading(false);
            setIsError(true);
            return;
        }

        setUserAccount(res.message);

        if (res.message.length > 0) {
            setIsCurrentAccount(res.message[0]);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (usersList.length > 0) {
            const firstUser = usersList[0];

            setIsCurrentUser(firstUser);
            setIsEmail(firstUser.email);

            fetchAllAccounts(firstUser);
        }
    }, [usersList, id]);

    const handleEmailChangeHandler = async (e) => {
        const value = e.target.value;

        setIsEmail(value);

        const selectedUser = usersList.find(
            (user) => user.email === value
        );

        setIsCurrentUser(selectedUser);

        await fetchAllAccounts(selectedUser);
    };

    const handleAccountChangeHandler = (e) => {
        const account = userAccount.find(
            (item) => item.accountNumber === e.target.value
        );

        setIsCurrentAccount(account);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!isCurrentAccount) return;

        updateHandler({
            user: isCurrentUser,
            account: isCurrentAccount,
            amount: isAmount,
            date: isDate,
            reason: isReason,
        });
    };

    if (isLoading) return <Loader />;

    if (isError) return <Error />;

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
                            Credit Customer Account
                        </h1>

                        <p>
                            Select a customer account and
                            securely credit funds with a
                            transaction reason and date.
                        </p>
                    </div>

                    <div className={styles.headerIcon}>
                        <span className="material-icons">
                            account_balance_wallet
                        </span>
                    </div>
                </div>

                <form
                    className={styles.editForm}
                    onSubmit={submitHandler}
                >
                    {/* RECIPIENT */}

                    <div className={styles.formCard}>
                        <div className={styles.sectionHeader}>
                            <span className="material-icons">
                                person_search
                            </span>

                            <div>
                                <h2>
                                    Recipient Selection
                                </h2>

                                <p>
                                    Select the customer and
                                    account to receive the
                                    credit.
                                </p>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputCards}>
                                <label>
                                    Customer Email
                                </label>

                                <select
                                    value={isEmail}
                                    onChange={
                                        handleEmailChangeHandler
                                    }
                                >
                                    {usersList.map((user) => (
                                        <option
                                            key={user._id}
                                            value={user.email}
                                        >
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputCards}>
                                <label>
                                    Account Number
                                </label>

                                <select
                                    value={
                                        isCurrentAccount?.accountNumber ||
                                        ""
                                    }
                                    onChange={
                                        handleAccountChangeHandler
                                    }
                                >
                                    {userAccount.map(
                                        (account) => (
                                            <option
                                                key={
                                                    account._id
                                                }
                                                value={
                                                    account.accountNumber
                                                }
                                            >
                                                {
                                                    account.accountNumber
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ACCOUNT INFORMATION */}

                    <div className={styles.formCard}>
                        <div className={styles.sectionHeader}>
                            <span className="material-icons">
                                account_balance
                            </span>

                            <div>
                                <h2>
                                    Account Information
                                </h2>

                                <p>
                                    Review the selected
                                    account before
                                    proceeding.
                                </p>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputCards}>
                                <label>
                                    Account Type
                                </label>

                                <input
                                    readOnly
                                    value={
                                        isCurrentAccount?.accountType ||
                                        ""
                                    }
                                />
                            </div>

                            <div className={styles.inputCards}>
                                <label>
                                    Account Number
                                </label>

                                <input
                                    readOnly
                                    value={
                                        isCurrentAccount?.accountNumber ||
                                        ""
                                    }
                                />
                            </div>

                            <div className={styles.inputCards}>
                                <label>
                                    Current Balance
                                </label>

                                <input
                                    readOnly
                                    value={
                                        isCurrentAccount?.Balance ||
                                        ""
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* CREDIT DETAILS */}

                    <div className={styles.formCard}>
                        <div className={styles.sectionHeader}>
                            <span className="material-icons">
                                payments
                            </span>

                            <div>
                                <h2>
                                    Credit Details
                                </h2>

                                <p>
                                    Enter the amount,
                                    transaction reason and
                                    transaction date.
                                </p>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputCards}>
                                <label>
                                    Credit Amount
                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={isAmount}
                                    onChange={(e) =>
                                        setIsAmount(
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.inputCards}>
                                <label>
                                    Transaction Date
                                </label>

                                <input
                                    type="date"
                                    value={isDate}
                                    onChange={(e) =>
                                        setIsDate(
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div
                                className={
                                    styles.inputCards
                                }
                                style={{
                                    gridColumn:
                                        "1 / span 2",
                                }}
                            >
                                <label>
                                    Transaction Reason
                                </label>

                                <input
                                    type="text"
                                    placeholder="Reason for credit"
                                    value={isReason}
                                    onChange={(e) =>
                                        setIsReason(
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            styles.buttonContainer
                        }
                    >
                        <button
                            type="submit"
                            className={
                                styles.updateButton
                            }
                        >
                            <span className="material-icons">
                                payments
                            </span>

                            Credit Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};