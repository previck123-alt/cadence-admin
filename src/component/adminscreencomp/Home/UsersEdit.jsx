import React, { useState, useEffect } from "react";
import styles from "./UserEdit.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    FiUser,
    FiMail,
    FiMapPin,
    FiLock,
    FiShield,
    FiKey,
    FiCheckCircle,
    FiSave
} from "react-icons/fi";

export const AdminUserEditComponent = ({ updateHandler }) => {

    const [isData, setIsData] = useState(null);

    const { color, usersList } = useSelector(
        state => state.userAuth
    );

    const { id } = useParams();

    // ===========================================
    // FETCH USER
    // ===========================================

    useEffect(() => {

        const dataObj = usersList.find(
            data => data._id.toString() === id.toString()
        );

        setIsData(dataObj);

    }, [id, usersList]);

    // ===========================================
    // INPUT HANDLER
    // ===========================================

    const handleChangeHandler = (e, field) => {

        const value =
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;

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

                            <h2>Edit Customer</h2>

                            <p>
                                Update customer information,
                                verification status and
                                banking credentials.
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
                        PROFILE CARD
                    ======================================== */}

                    <div className={styles.profileCard}>

                        <div className={styles.avatar}>
                            <FiUser />
                        </div>

                        <div className={styles.profileInfo}>

                            <h3>

                                {isData.firstName || "Unknown"}{" "}
                                {isData.lastName || ""}

                            </h3>

                            <p>{isData.email}</p>

                            <span>

                                User ID:
                                {" "}
                                {isData._id}

                            </span>

                        </div>

                    </div>

                    {/* =======================================
                        PERSONAL INFORMATION
                    ======================================== */}

                    <div className={styles.formSection}>

                        <h3>

                            <FiUser />

                            Personal Information

                        </h3>

                        <div className={styles.gridTwo}>

                            <div className={styles.inputGroup}>

                                <label>First Name</label>

                                <div className={styles.inputWrapper}>

                                    <FiUser />

                                    <input
                                        type="text"
                                        value={isData.firstName || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "firstName"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Last Name</label>

                                <div className={styles.inputWrapper}>

                                    <FiUser />

                                    <input
                                        type="text"
                                        value={isData.lastName || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "lastName"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Email Address</label>

                                <div className={styles.inputWrapper}>

                                    <FiMail />

                                    <input
                                        type="email"
                                        value={isData.email || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "email"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Password</label>

                                <div className={styles.inputWrapper}>

                                    <FiLock />

                                    <input
                                        type="text"
                                        value={isData.password || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "password"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>Country</label>

                                <div className={styles.inputWrapper}>

                                    <FiMapPin />

                                    <input
                                        type="text"
                                        value={isData.country || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "country"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label>State</label>

                                <div className={styles.inputWrapper}>

                                    <FiMapPin />

                                    <input
                                        type="text"
                                        value={isData.state || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                e,
                                                "state"
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>
                                        {/* =======================================
                        VERIFICATION STATUS
                    ======================================== */}

                    <div className={styles.formSection}>
                        <h3>
                            <FiCheckCircle />
                            Verification Status
                        </h3>

                        <div className={styles.verificationGrid}>
                            {[
                                "emailVerified",
                                "otpVerified",
                            ].map((field) => (
                                <div key={field} className={styles.verifyCard}>
                                    <label>{field}</label>
                                    <select
                                        value={String(isData[field] ?? false)}
                                        onChange={(e) =>
                                            setIsData(prev => ({
                                                ...prev,
                                                [field]: e.target.value === "true"
                                            }))
                                        }
                                    >
                                        <option value="true">Verified</option>
                                        <option value="false">Not Verified</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* =======================================
                        TRANSACTION PIN
                    ======================================== */}

                    <div className={styles.formSection}>
                        <h3>
                            <FiKey />
                            Transaction PIN
                        </h3>

                        <div className={styles.gridTwo}>
                            <div className={styles.inputGroup}>
                                <label>Set 4-Digit Transaction PIN</label>
                                <div className={styles.inputWrapper}>
                                    <FiKey />
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        maxLength={4}
                                        autoComplete="new-password"
                                        placeholder="Enter new PIN"
                                        value={isData.transactionPin || ""}
                                        onChange={(e) =>
                                            handleChangeHandler(
                                                { target: { value: e.target.value.replace(/\D/g, "").slice(0, 4), type: "text" } },
                                                "transactionPin"
                                            )
                                        }
                                    />
                                </div>
                                <small style={{ marginTop: 6, color: "#6b7280" }}>
                                    Leave blank to keep the current PIN.
                                </small>
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