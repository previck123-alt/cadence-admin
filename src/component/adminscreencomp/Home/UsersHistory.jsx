import React, { useState, useEffect } from 'react';
import styles from './usersHistory.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { Error } from "../../common/Error";
import { useNavigate } from 'react-router-dom';

export const AdminUserHistoryComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { color } = useSelector(state => state.userAuth);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {

        setIsError(false);

        const res = await dispatch(fetchUsers());

        if (!res.bool) {
            setIsError(true);
            setIsLoading(false);
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

        const newData = filteredUsers.filter(item => {

            return (
                item.email?.toLowerCase().includes(value) ||
                item.firstName?.toLowerCase().includes(value) ||
                item.lastName?.toLowerCase().includes(value) ||
                item.country?.toLowerCase().includes(value)
            );

        });

        setUserList(newData);

    };

    const depositHandler = (id) => {
        navigate(`/transactions/${id}`);
    };

    if (isLoading) return <Loader />;

    if (isError) return <Error />;

    return (

        <div
            className={styles.homeScreen}
            style={{ backgroundColor: color.background }}
        >

            <div
                className={styles.timeline}
                style={{ backgroundColor: color.background }}
            >

                {/* Page Header */}

                <div className={styles.pageHeader}>

                    <div>

                        <h1>User Transaction History</h1>

                        <p>
                            Search any customer and quickly access
                            their complete transaction history.
                        </p>

                    </div>

                    <div className={styles.headerIcon}>
                        <span className="material-icons">
                            history
                        </span>
                    </div>

                </div>

                {/* Statistics */}

                <div className={styles.statsGrid}>

                    <div className={styles.statCard}>

                        <span className="material-icons">
                            groups
                        </span>

                        <div>

                            <h2>{userList.length}</h2>

                            <p>Total Users</p>

                        </div>

                    </div>

                    <div className={styles.statCard}>

                        <span className="material-icons">
                            manage_search
                        </span>

                        <div>

                            <h2>
                                {filteredUsers.length}
                            </h2>

                            <p>Searchable Records</p>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className={styles.filter}>

                    <div className={styles.searchContainer}>

                        <div className={styles.searchBar}>

                            <span className="material-icons">
                                search
                            </span>

                            <input
                                className={styles.input}
                                placeholder="Search by email, name or country..."
                                onChange={searchHandler}
                            />

                        </div>

                    </div>

                </div>

                <div className={styles.tableContainer}>

                    {userList.length === 0 ? (

                        <div className={styles.emptyContainer}>

                            <span className="material-icons">
                                history_toggle_off
                            </span>

                            <h3>No Users Found</h3>

                            <p>
                                There are currently no registered users
                                matching your search.
                            </p>

                        </div>

                    ) : (

                        <table className={styles.dataTable}>

                            <thead>

                                <tr>

                                    <th>Email Address</th>

                                    <th>Customer Name</th>

                                    <th>Country</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {userList.map((data) => (

                                    <tr
                                        key={data._id}
                                    >

                                        <td>

                                            <div className={styles.userEmail}>

                                                <span className="material-icons">
                                                    mail
                                                </span>

                                                {data.email}

                                            </div>

                                        </td>

                                        <td>

                                            <div className={styles.userName}>

                                                <div className={styles.avatar}>

                                                    {(data.firstName || "?")[0]}
                                                    {(data.lastName || "")[0]}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {data.firstName} {data.lastName}
                                                    </strong>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className={styles.countryBadge}>

                                                {data.country || "Not Set"}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className={styles.actionButton}
                                                onClick={() => depositHandler(data._id)}
                                            >

                                                <span className="material-icons">
                                                    visibility
                                                </span>

                                                View History

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

