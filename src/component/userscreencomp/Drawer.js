import React from 'react';
import styles from './Drawer.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from './../../store/action/userAppStorage';

let topMenu = [
    {
        icon: 'list',
        title: 'Users',
        link: '/users'
    },
    {
        icon: 'settings',
        title: 'Settings',
        link: '/admin'
    },
    {
        icon: 'history',
        title: 'History',
        link: '/user-transactions'
    },
    {
        icon: 'payments',
        title: 'Credit',
        link: '/credit'
    },
    {
        icon: 'payments',
        title: 'Debit',
        link: '/debit'
    },
    
    {
        icon: 'account_balance_wallet',
        title: 'Client Accounts',
        link: '/user-accounts'
    },
];

const DashboardDrawer = ({ showmenuHandler }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { color } = useSelector(state => state.userAuth);

    const navigateHandler = async (data) => {

        if (data === "signout") {

            navigate("/");

            await dispatch(logout());

        } else {

            navigate(data);

        }

    };

    return (

        <div
            className="drawerCon"
            style={{ backgroundColor: color.background }}
        >

            <div
                className={styles.drawer}
                style={{ backgroundColor: color.background }}
            >

                <div
                    className={styles.cancel}
                >

                    <span
                        className="material-icons"
                        onClick={showmenuHandler}
                        style={{ color: color.importantText }}
                    >
                        close
                    </span>

                </div>

                <ul className={styles.drawerMenuCon}>

                    {topMenu.map(item => (

                        <li
                            key={item.link}
                            className={styles.drawerMenu}
                            onClick={() => navigateHandler(item.link)}
                        >

                            <span
                                className="material-icons"
                                style={{
                                    backgroundColor: color.fadeColor,
                                    color: color.normalText
                                }}
                            >
                                {item.icon}
                            </span>

                            <p
                                style={{
                                    color: color.blue
                                }}
                            >
                                {item.title}
                            </p>

                        </li>

                    ))}

                </ul>

                <div className={styles.boxunderline}></div>

                <div
                    className={styles.logout}
                    onClick={() => navigateHandler("signout")}
                >

                    <span className="material-icons">
                        logout
                    </span>

                    <p>Logout</p>

                </div>

            </div>

        </div>

    );

};

export default DashboardDrawer;