import React, { useState, useEffect } from "react";
import styles from "./Accounts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from "../../common/HomeLoader";
import { Error } from "../../common/Error";
import { useNavigate } from "react-router-dom";

export const AdminUserAccountComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { color } = useSelector(
        state => state.userAuth
    );

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {

        fetchAllUsers();

    }, []);

    const fetchAllUsers = async () => {

        setIsLoading(true);
        setIsError(false);

        const res = await dispatch(
            fetchUsers()
        );

        if (!res.bool) {

            setIsLoading(false);
            setIsError(true);

            return;

        }

        setUserList(res.message);
        setFilteredUsers(res.message);

        setIsLoading(false);

    };

    const searchHandler = (e) => {

        const value = e.target.value.toLowerCase();

        if (!value) {

            setUserList(filteredUsers);

            return;

        }

        const filtered = filteredUsers.filter(user => {

            return (

                user.email?.toLowerCase().includes(value) ||

                user.firstName?.toLowerCase().includes(value) ||

                user.country?.toLowerCase().includes(value)

            );

        });

        setUserList(filtered);

    };

    const navigateHandler = (id) => {

        navigate(`/accounts/${id}`);

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

                {/* HEADER */}

                <div className={styles.pageHeader}>

                    <div>

                        <h1
                            style={{
                                color: color.importantText,
                            }}
                        >
                            Customer Directory
                        </h1>

                        <p>

                            Browse all registered customers
                            and manage their banking
                            accounts.

                        </p>

                    </div>

                    <div className={styles.headerIcon}>

                        <span className="material-icons">

                            groups

                        </span>

                    </div>

                </div>

                {/* SEARCH */}

                <div className={styles.topBar}>

                    <div className={styles.searchBar}>

                        <span className="material-icons">

                            search

                        </span>

                        <input
                            type="text"
                            placeholder="Search customer..."
                            onChange={searchHandler}
                        />

                    </div>

                </div>

                {/* TABLE */}

                <div className={styles.tableCard}>

                    <div className={styles.tableHeader}>

                        <div>

                            <h2>

                                Registered Customers

                            </h2>

                            <p>

                                Click a customer to view
                                all associated accounts.

                            </p>

                        </div>

                    </div>

                    {

                        userList.length === 0 ?

                        (

                            <div className={styles.emptyState}>

                                <span className="material-icons">

                                    group_off

                                </span>

                                <h3>

                                    No Customers Found

                                </h3>

                                <p>

                                    There are currently no
                                    registered customers.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className={styles.tableContainer}>

                                <table
                                    className={styles.accountTable}
                                >

                                    <thead>

                                        <tr>

                                            <th>Email</th>

                                            

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            userList.map(user => (

                                                <tr
                                                    key={user._id}
                                                    onClick={() =>
                                                        navigateHandler(
                                                            user._id
                                                        )
                                                    }
                                                    style={{
                                                        cursor:"pointer"
                                                    }}
                                                >

                                                    <td>

                                                        {user.email}

                                                    </td>

                                                

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

};