import React from "react";
import styles from "./dashboardNav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardHeader = ({
    showmenuHandler,
    headerTitle,
}) => {

    const navigate = useNavigate();

    const { user, color } = useSelector(
        state => state.userAuth
    );

    const navigateHandler = (path) => {

        navigate(path);

    };

    return (

        <header
            className={styles.dashboardHeader}
            style={{
                backgroundColor: color.background,
            }}
        >

            {/* =========================
                    LEFT SIDE
            ========================== */}

            <div className={styles.headerLeft}>

                <button
                    type="button"
                    className={styles.mobileMenu}
                    onClick={showmenuHandler}
                    aria-label="Toggle Sidebar"
                    style={{
                        backgroundColor: color.fadeColor,
                    }}
                >

                    <span
                        className="material-icons"
                        style={{
                            color: color.importantText,
                        }}
                    >
                        menu
                    </span>

                </button>

                <div className={styles.titleSection}>

                    <span className={styles.breadcrumb}>

                        Dashboard

                    </span>

                    <h1
                        className={styles.pageTitle}
                        style={{
                            color: color.importantText,
                        }}
                    >

                        {headerTitle}

                    </h1>

                </div>

            </div>

            {/* =========================
                    RIGHT SIDE
            ========================== */}

            <div className={styles.headerRight}>

                {/* Notification */}

                <button
                    type="button"
                    className={styles.notificationButton}
                    aria-label="Notifications"
                    style={{
                        backgroundColor: color.fadeColor,
                    }}
                >

                    <span
                        className="material-icons"
                        style={{
                            color: color.importantText,
                        }}
                    >

                        notifications_none

                    </span>

                    <span
                        className={styles.notificationBadge}
                    ></span>

                </button>

                {/* Divider */}

                <div className={styles.divider}></div>

                {/* Profile */}

                <button
                    type="button"
                    className={styles.profileCard}
                    onClick={() =>
                        navigateHandler("/profilesettings")
                    }
                >

                    <div
                        className={styles.profileAvatar}
                        style={{
                            backgroundColor:
                                color.fadeButtonColor,
                        }}
                    >

                        <span
                            className="material-icons"
                            style={{
                                color:
                                    color.importantText,
                            }}
                        >

                            person

                        </span>

                    </div>

                    <div className={styles.profileInfo}>

                        <h4
                            style={{
                                color:
                                    color.importantText,
                            }}
                        >

                            {user?.firstName ||
                                "Administrator"}

                        </h4>

                        <p>

                            Administrator

                        </p>

                    </div>

                    <span
                        className={`material-icons ${styles.arrow}`}
                    >

                        expand_more

                    </span>

                </button>

            </div>

        </header>

    );

};

export default DashboardHeader;