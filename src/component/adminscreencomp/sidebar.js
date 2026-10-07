import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./sidebar.module.css";

const Sidebar = ({ status }) => {

    const navigate = useNavigate();

    const { color } = useSelector(state => state.userAuth);

    const menuBackgroundColor = color.fadeColor
        ? "rgba(13,110,253,.12)"
        : "#0f62fe";

    const menuTextColor = color.fadeColor
        ? "#0f62fe"
        : "#ffffff";

    const navigateHandler = (path) => {
        navigate(path);
    };

    const linkData = [
        {
            icon: "list",
            title: "users",
            link: "/users",
        },
        {
            icon: "settings",
            title: "setting",
            link: "/admin",
        },
        {
            icon: "history",
            title: "history",
            link: "/user-transactions",
        },
        {
            icon: "money",
            title: "debit",
            link: "/debit",
        },
        {
            icon: "money",
            title: "credit",
            link: "/credit",
        },
      
        {
            icon: "edit",
            title: "Client Accounts",
            link: "/user-accounts",
        },
        
    ];

    return (

        <aside
            className={styles.sidebar}
            style={{ backgroundColor: color.background }}
        >

            {/* =========================
                TOP SECTION
            ========================== */}

            <div className={styles.topSection}>

                <div className={styles.brandContainer}>

                    <div className={styles.brandIcon}>
                        <span className="material-icons">
                            admin_panel_settings
                        </span>
                    </div>

                    <div className={styles.brandText}>

                        <h2
                            style={{
                                color: color.importantText,
                            }}
                        >
                            Admin Panel
                        </h2>

                        <small>
                            Management Dashboard
                        </small>

                    </div>

                </div>

            </div>

            {/* =========================
                MENU
            ========================== */}

            <div className={styles.middleSection}>

                <ul>

                    {linkData.map((item) => {

                        const active =
                            status === item.title;

                        return (

                            <li
                                key={item.link}
                                onClick={() =>
                                    navigateHandler(item.link)
                                }
                                className={`${styles.menuItem} ${
                                    active
                                        ? styles.active
                                        : ""
                                }`}
                                style={{
                                    backgroundColor: active
                                        ? menuBackgroundColor
                                        : "",
                                }}
                            >

                                <span
                                    className={`material-icons ${styles.icon}`}
                                    style={{
                                        color: active
                                            ? menuTextColor
                                            : color.normalText,
                                    }}
                                >
                                    {item.icon}
                                </span>

                                <p
                                    className={styles.listText}
                                    style={{
                                        color: active
                                            ? menuTextColor
                                            : color.normalText,
                                    }}
                                >
                                    {item.title}
                                </p>

                                <div className={styles.tooltip}>
                                    {item.title}
                                </div>

                            </li>

                        );

                    })}

                </ul>

            </div>
                        {/* =========================
                FOOTER
            ========================== */}

            <div className={styles.endSection}>

                <div
                    className={styles.logoutCard}
                    onClick={() => navigate("/adminlogin")}
                >

                    <div className={styles.logoutIcon}>
                        <span className="material-icons">
                            logout
                        </span>
                    </div>

                    <div className={styles.logoutText}>

                        <h4>Logout</h4>

                        <small>
                            End current session
                        </small>

                    </div>

                </div>

            </div>

        </aside>

    );

};

export default Sidebar;