import React, { useState, useCallback } from "react";
import styles from "./Login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../../../component/common/input";
import SubmitBtn from "../../../component/common/Submit";
import LoadingModal from "../../../component/Modal/LoadingModal";

import { loginAdmin } from "../../../store/action/userAppStorage";

function LoginPage() {
    // ==========================
    // FORM STATES
    // ==========================
    const [userEmail, setUserEmail] = useState("");
    const [userEmailError, setUserEmailError] = useState("");

    const [userPassword, setUserPassword] = useState("");
    const [userPasswordError, setUserPasswordError] = useState("");

    // ==========================
    // UI STATES
    // ==========================
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // ==========================
    // REDUX
    // ==========================
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { color } = useSelector(
        (state) => state.userAuth
    );

    // ==========================
    // FORM VALIDATION
    // ==========================
    const isFormValid =
        userEmail &&
        !userEmailError &&
        userPassword &&
        !userPasswordError;

    // ==========================
    // HANDLE INPUTS
    // ==========================
    const setFormDetails = useCallback((e) => {
        setIsError(false);

        if (e.formName === "userEmail") {
            setUserEmail(e.value);
            setUserEmailError(e.error);
        }

        if (e.formName === "userPassword") {
            setUserPassword(e.value);
            setUserPasswordError(e.error);
        }
    }, []);

    // ==========================
    // LOGIN
    // ==========================
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        setIsLoading(true);

        const response = await dispatch(
            loginAdmin({
                email: userEmail,
                password: userPassword,
            })
        );

        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);

            setTimeout(() => {
                navigate(`${response.url}`);
            }, 3000);

            return;
        }

        setIsLoading(false);

        setTimeout(() => {
            navigate(`${response.url}`);
        }, 1500);
    };

    return (
        <div className={styles.screenContainer}>

            {isLoading && <LoadingModal />}

            {/* ==========================
                LEFT HERO PANEL
            ========================== */}

            <div className={styles.leftContainer}>

                <div className={styles.heroContent}>

                    <div className={styles.logoBox}>
                        <div className={styles.logoCircle}>
                            A
                        </div>

                        <h2>Admin Portal</h2>
                    </div>

                    <h1>
                        Secure Dashboard
                        <br />
                        Management
                    </h1>

                    <p>
                        Manage users, accounts, transactions,
                        approvals and system activities from one
                        powerful dashboard.
                    </p>

                    <div className={styles.heroFeatures}>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Real-time Account Monitoring</p>
                        </div>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Secure Administrator Access</p>
                        </div>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Powerful Analytics Dashboard</p>
                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================
                RIGHT LOGIN PANEL
            ========================== */}

            <div className={styles.rightContainer}>

                <form
                    className={styles.rightformcontainer}
                    onSubmit={submitHandler}
                >

                    <div className={styles.loginCard}>

                        <div className={styles.headerSection}>

                            <small className={styles.badge}>
                                ADMIN PANEL
                            </small>

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Sign in to continue managing
                                your platform securely.
                            </p>

                        </div>

                                                <div className={styles.inputcontainer}>

                            <div className={styles.formCard}>
                                <FormInput
                                    icon="edit"
                                    label="Email Address"
                                    type="email"
                                    types="email"
                                    className="formcard"
                                    formName="userEmail"
                                    placeholder="Enter your email address"
                                    setFormDetails={setFormDetails}
                                />
                            </div>

                            <div className={styles.formCard}>
                                <FormInput
                                    icon="lock"
                                    label="Password"
                                    type="password"
                                    types="password"
                                    className="formcard"
                                    formName="userPassword"
                                    placeholder="Enter your password"
                                    setFormDetails={setFormDetails}
                                />
                            </div>

                        </div>

                        <div className={styles.actionArea}>

                            <div className={styles.optionRow}>

                                <label className={styles.rememberMe}>

                                    <input
                                        type="checkbox"
                                    />

                                    <span>
                                        Remember this device
                                    </span>

                                </label>

                                <span
                                    className={styles.forgotPassword}
                                    onClick={() => navigate("/admin/forgot-password")}
                                >
                                    Forgot Password?
                                </span>

                            </div>

                            <div className={styles.submit}>

                                <SubmitBtn
                                    text="Sign In"
                                    style={{
                                        opacity: isFormValid ? 1 : 0.6,
                                        borderRadius: "14px",
                                        height: "56px",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        width: "100%",
                                        transition: ".3s"
                                    }}
                                />

                            </div>

                            {isError && (
                                <div className={styles.errorBox}>
                                    <p className={styles.errorText}>
                                        {isErrorInfo}
                                    </p>
                                </div>
                            )}

                        </div>

                        <div className={styles.footerArea}>

                            <div className={styles.divider}>
                                <span></span>
                                <small>Secure Login</small>
                                <span></span>
                            </div>

                            <p className={styles.footerText}>
                                Your session is protected using encrypted
                                communication and secure authentication.
                            </p>

                            <div className={styles.footerInfo}>

                                <div className={styles.infoCard}>
                                    <h4>Users</h4>
                                    <span>Manage Accounts</span>
                                </div>

                                <div className={styles.infoCard}>
                                    <h4>Security</h4>
                                    <span>Protected Access</span>
                                </div>

                                <div className={styles.infoCard}>
                                    <h4>Reports</h4>
                                    <span>Real-time Analytics</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;