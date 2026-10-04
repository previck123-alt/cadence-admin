import React from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { AdminCardComponent } from '../../../component/adminscreencomp/Home/Card';

const Card = ({status}) => {
    //tradeModal and transfer modal
    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }

    return (<>
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  headerTitle='Client Card' />
                <AdminCardComponent status={status}/>
            </div>
        </div>
    </>
    )
}

export default Card