import React, { useState } from 'react';
import styles from '../../Home.module.css';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import Sidebar from '../../../component/adminscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import LoadingModal from "../../../component/Modal/LoadingModal";
import { useDispatch } from 'react-redux';
import { AdminUserLoanComponent} from '../../../component/adminscreencomp/Home/UserLoan';
import { Error } from '../../../component/common/Error';

const UserLoan = ({status}) => {
    //tradeModal and transfer modal
    let [isLoading, setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let showmenuHandler = () => {
        let drawer = document.querySelector('.drawerCon')
        drawer.classList.toggle('showdrawer')
    }

    if(isError){
        return <Error/>
    }





    return (<>
        {isLoading && <LoadingModal />}
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Sidebar status='Matters' />
            </div>

            <div className={styles.main}>
                {/*mobile and dashboard headers*/}
                <DashboardDrawer showmenuHandler={showmenuHandler} />
                <DashboardHeader showmenuHandler={showmenuHandler}  headerTitle='Client Loans' />
                <AdminUserLoanComponent status={status}/>
            </div>



        </div>
    </>
    )
}

export default UserLoan