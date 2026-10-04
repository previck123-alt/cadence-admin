import React, { useState, useCallback } from "react";
import styles from "./Login.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../../../component/common/input";
import SubmitBtn from "../../../component/common/Submit";
import LoadingModal from "../../../component/Modal/LoadingModal";

import { signupAdmin } from "../../../store/action/userAppStorage";

function SignupPage() {

    // ==========================
    // FORM STATES
    // ==========================

    const [adminEmail, setAdminEmail] = useState("");
    const [adminEmailError, setAdminEmailError] = useState("");

    const [adminPassword, setAdminPassword] = useState("");
    const [adminPasswordError, setAdminPasswordError] = useState("");

    const [isSecretKey, setIsSecretKey] = useState("");
    const [isSecretKeyError, setIsSecretKeyError] = useState("");

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
    // VALIDATION
    // ==========================

    const isFormValid =
        adminEmail &&
        !adminEmailError &&
        adminPassword &&
        !adminPasswordError &&
        isSecretKey &&
        !isSecretKeyError;

    // ==========================
    // NAVIGATION
    // ==========================

    const toLogin = () => {
        navigate("/adminlogin");
    };

    // ==========================
    // INPUT HANDLER
    // ==========================

    const setFormDetails = useCallback((e) => {

        setIsError(false);

        if (e.formName === "adminEmail") {
            setAdminEmail(e.value);
            setAdminEmailError(e.error);
        }

        if (e.formName === "adminPassword") {
            setAdminPassword(e.value);
            setAdminPasswordError(e.error);
        }

        if (e.formName === "adminSecretKey") {
            setIsSecretKey(e.value);
            setIsSecretKeyError(e.error);
        }

    }, []);

    // ==========================
    // SIGNUP
    // ==========================

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!isFormValid) return;

        setIsLoading(true);

        const response = await dispatch(
            signupAdmin({
                email: adminEmail,
                password: adminPassword,
                secretKey: isSecretKey,
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
                        Create Your
                        <br />
                        Administrator
                        <br />
                        Account
                    </h1>

                    <p>
                        Register a secure administrator account to manage users,
                        accounts, transactions, security settings and platform
                        operations from one centralized dashboard.
                    </p>

                    <div className={styles.heroFeatures}>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Enterprise-grade Security</p>
                        </div>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Powerful Admin Dashboard</p>
                        </div>

                        <div className={styles.feature}>
                            <span>✓</span>
                            <p>Real-time Monitoring & Reports</p>
                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================
                RIGHT PANEL
            ========================== */}

            <div className={styles.rightContainer}>

                <form
                    className={styles.rightformcontainer}
                    onSubmit={submitHandler}
                >

                    <div className={styles.loginCard}>

                        <div className={styles.headerSection}>

                            <small className={styles.badge}>
                                ADMIN REGISTRATION
                            </small>

                            <h2>Create Account</h2>

                            <p>
                                Create your administrator account to access the
                                management dashboard securely.
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
                                    formName="adminEmail"
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
                                    formName="adminPassword"
                                    placeholder="Create a secure password"
                                    setFormDetails={setFormDetails}
                                />
                            </div>

                            <div className={styles.formCard}>
                                <FormInput
                                    icon="vpn_key"
                                    label="Secret Key"
                                    type="text"
                                    types="text"
                                    className="formcard"
                                    formName="adminSecretKey"
                                    placeholder="Enter administrator secret key"
                                    setFormDetails={setFormDetails}
                                />
                            </div>

                        </div>

                        <div className={styles.actionArea}>

                            <div className={styles.submit}>

                                <SubmitBtn
                                    text="Create Account"
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

                            <p className={styles.footerText}>

                                By creating an account you agree to our
                                <strong> Terms of Service </strong>
                                and
                                <strong> Privacy Policy</strong>.

                            </p>

                            <div className={styles.divider}>

                                <span></span>

                                <small>Already Registered?</small>

                                <span></span>

                            </div>

                            <p className={styles.alternative}>

                                Already have an administrator account?

                                <span
                                    onClick={toLogin}
                                    style={{ cursor: "pointer", marginLeft: "6px" }}
                                >
                                    Sign In
                                </span>

                            </p>

                            <div className={styles.footerInfo}>

                                <div className={styles.infoCard}>
                                    <h4>Fast Setup</h4>
                                    <span>Create your account in minutes.</span>
                                </div>

                                <div className={styles.infoCard}>
                                    <h4>Protected</h4>
                                    <span>Enterprise-grade security for every login.</span>
                                </div>

                                <div className={styles.infoCard}>
                                    <h4>Admin Access</h4>
                                    <span>Manage users, accounts and transactions.</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default SignupPage;