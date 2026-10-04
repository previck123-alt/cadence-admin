import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FiSearch,
    FiUsers,
    FiGlobe,
    FiTrash2,
    FiEdit2,
    FiMail,
    FiRefreshCw
} from "react-icons/fi";

import {
    deleteUser,
    fetchUsers
} from "../../../store/action/userAppStorage";

import { Loader } from "../../common/HomeLoader";
import { Error } from "../../common/Error";

export const AdminUsersComponent = ({ status }) => {

    // ==========================
    // STATES
    // ==========================

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    // ==========================
    // REDUX
    // ==========================

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { color } = useSelector(
        state => state.userAuth
    );

    // ==========================
    // FETCH USERS
    // ==========================

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {

        setIsError(false);

        const res = await dispatch(fetchUsers());

        if (!res.bool) {

            setIsLoading(false);
            setIsError(true);

            return;
        }

        setUserList(res.message);
        setFilteredUsers(res.message);

        setIsLoading(false);

    };

    // ==========================
    // EDIT USER
    // ==========================

    const editHandler = (id) => {
        navigate(`/users/${id}`);
    };

    // ==========================
    // DELETE USER
    // ==========================

    const deleteHandler = async (id) => {

        setIsError(false);

        const res = await dispatch(deleteUser(id));

        if (!res.bool) {

            setIsLoading(false);
            setIsError(true);

            return;
        }

        const updatedUsers = userList.filter(
            user => user._id !== id
        );

        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);

    };

    // ==========================
    // SEARCH
    // ==========================

    const searchHandler = (e) => {

        const value = e.target.value.toLowerCase();

        if (!value) {

            setUserList(filteredUsers);
            return;

        }

        const result = filteredUsers.filter(user => {

            const email = user.email
                ? user.email.toLowerCase()
                : "";

            const firstName = user.firstName
                ? user.firstName.toLowerCase()
                : "";

            const lastName = user.lastName
                ? user.lastName.toLowerCase()
                : "";

            const country = user.country
                ? user.country.toLowerCase()
                : "";

            return (

                email.includes(value) ||
                firstName.includes(value) ||
                lastName.includes(value) ||
                country.includes(value)

            );

        });

        setUserList(result);

    };

    // ==========================
    // LOADING
    // ==========================

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Error />;
    }

    return (

        <div
            className={styles.homeScreen}
            style={{ backgroundColor: color.background }}
        >

            <div
                className={styles.timeline}
                style={{ backgroundColor: color.background }}
            >

                {/* =====================================
                        PAGE HEADER
                ====================================== */}

                <div className={styles.pageHeader}>

                    <div>

                        <h2>
                            User Management
                        </h2>

                        <p>
                            Manage registered users, update
                            records and monitor customer
                            accounts from one place.
                        </p>

                    </div>

                    <button
                        className={styles.refreshButton}
                        onClick={fetchAllUsers}
                    >

                        <FiRefreshCw />

                        Refresh

                    </button>

                </div>

                {/* =====================================
                        STATISTICS
                ====================================== */}

                <div className={styles.statsGrid}>

                    <div className={styles.statCard}>

                        <div className={styles.statIcon}>
                            <FiUsers />
                        </div>

                        <div>

                            <h3>
                                {filteredUsers.length}
                            </h3>

                            <span>
                                Total Users
                            </span>

                        </div>

                    </div>

                    <div className={styles.statCard}>

                        <div className={styles.statIcon}>
                            <FiMail />
                        </div>

                        <div>

                            <h3>
                                {filteredUsers.filter(
                                    user => user.email
                                ).length}
                            </h3>

                            <span>
                                Active Emails
                            </span>

                        </div>

                    </div>

                    <div className={styles.statCard}>

                        <div className={styles.statIcon}>
                            <FiGlobe />
                        </div>

                        <div>

                            <h3>
                                {
                                    new Set(
                                        filteredUsers.map(
                                            user => user.country
                                        )
                                    ).size
                                }
                            </h3>

                            <span>
                                Countries
                            </span>

                        </div>

                    </div>

                </div>


                                {/* =====================================
                        SEARCH BAR
                ====================================== */}

                <div className={styles.filterSection}>

                    <div className={styles.searchContainer}>

                        <FiSearch className={styles.searchIcon} />

                        <input
                            type="text"
                            placeholder="Search by email, name or country..."
                            className={styles.searchInput}
                            onChange={searchHandler}
                        />

                    </div>

                </div>

                {/* =====================================
                        USERS TABLE
                ====================================== */}

                <div className={styles.tableCard}>

                    {userList.length === 0 ? (

                        <div className={styles.emptyState}>

                            <FiUsers className={styles.emptyIcon} />

                            <h3>No Registered Users</h3>

                            <p>
                                There are currently no users
                                available in the system.
                            </p>

                        </div>

                    ) : (

                        <div className={styles.tableContainer}>

                            <table className={styles.userTable}>

                                <thead>

                                    <tr>

                                        <th>Email</th>

                                        <th>First Name</th>

                                        <th>Last Name</th>

                                        <th>Country</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {userList.map((user) => (

                                        <tr key={user._id}>

                                            <td>

                                                <div className={styles.emailCell}>

                                                    <FiMail />

                                                    <span>
                                                        {user.email || "--"}
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {user.firstName || "--"}
                                            </td>

                                            <td>
                                                {user.lastName || "--"}
                                            </td>

                                            <td>
                                                {user.country || "--"}
                                            </td>

                                            <td>

                                                <div className={styles.actionButtons}>

                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() =>
                                                            editHandler(user._id)
                                                        }
                                                    >

                                                        <FiEdit2 />

                                                        Edit

                                                    </button>

                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() =>
                                                            deleteHandler(user._id)
                                                        }
                                                    >

                                                        <FiTrash2 />

                                                        Delete

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