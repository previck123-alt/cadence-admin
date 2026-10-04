import React, { useState, useEffect } from "react";
import styles from "./AdminEdit.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const AdminEditComponent = ({ updateHandler }) => {

    const [isData, setIsData] = useState(null);

    const { color, admin } = useSelector(
        state => state.userAuth
    );

    const { id } = useParams();

    const handleChangeHandler = (e, field) => {

        const value = e.target.value;

        setIsData(prev => ({
            ...prev,
            [field]: value,
        }));

    };

    useEffect(() => {

        setIsData(admin);

    }, [admin, id]);

    const submitHandler = (e) => {

        e.preventDefault();

        updateHandler(isData);

    };

    if (!admin || !isData) return null;

    return (

        <div
            className={styles.homeScreen}
            style={{ backgroundColor: color.background }}
        >

            <div
                className={styles.timeline}
                style={{ backgroundColor: color.background }}
            >

                <div className={styles.pageHeader}>

                    <div>

                        <h1
                            style={{
                                color: color.importantText,
                            }}
                        >
                            Administrator Settings
                        </h1>

                        <p>
                            Manage your administrator account
                            information and security credentials.
                        </p>

                    </div>

                    <div className={styles.headerIcon}>

                        <span className="material-icons">
                            admin_panel_settings
                        </span>

                    </div>

                </div>

                <form
                    className={styles.editForm}
                    onSubmit={submitHandler}
                >

                    <div className={styles.formCard}>

                        <div className={styles.sectionHeader}>

                            <span className="material-icons">
                                manage_accounts
                            </span>

                            <div>

                                <h2>
                                    Account Information
                                </h2>

                                <p>
                                    Update your administrator login
                                    credentials.
                                </p>

                            </div>

                        </div>
                                                <div className={styles.formGrid}>

                            <div className={styles.inputCards}>

                                <label>Email Address</label>

                                <input
                                    type="email"
                                    value={isData.email}
                                    onChange={(e) =>
                                        handleChangeHandler(e, "email")
                                    }
                                    placeholder="Enter your email address"
                                    required
                                />

                            </div>

                            <div className={styles.inputCards}>

                                <label>Password</label>

                                <input
                                    type="password"
                                    value={isData.password}
                                    onChange={(e) =>
                                        handleChangeHandler(e, "password")
                                    }
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>

                        </div>

                    </div>

                    <div className={styles.buttonContainer}>

                        <button
                            type="submit"
                            className={styles.updateButton}
                        >

                            <span className="material-icons">
                                save
                            </span>

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};