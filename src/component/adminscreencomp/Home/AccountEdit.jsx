import React, { useState, useEffect } from 'react';
import styles from './AccountForm.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminAccountEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({})
    let { color, accountList } = useSelector(state => state.userAuth)

    let { user } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })
    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        updateHandler(isData)
    }



    useEffect(() => {
        let dataObj = accountList.find(data => data._id.toString() === user.toString())
        setIsData(dataObj)
    }, [user])



    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {accountList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Account Type
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'accountType')} value={isData?.accountType} type='text' placeholder='Everyday checking' required />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Account Number
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'accountNumber')} value={isData?.accountNumber} type='number' placeholder='122....667' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Available Balance
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'Balance')} value={isData?.Balance} type='number' placeholder='$10.00' required />
                    </div>




                    <div className={styles.buttonContainer} >
                        <button >Update Account</button>
                    </div>



                </form>}
            </div>






        </div></>)




}