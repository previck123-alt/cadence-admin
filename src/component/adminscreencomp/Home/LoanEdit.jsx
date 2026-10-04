import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminLoanEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({})
    let { color, loanList } = useSelector(state => state.userAuth)

    let { id } = useParams()
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
        let dataObj = loanList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)
    }, [id])



    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {loanList && isData && <form className={styles.editForm} onSubmit={submitHandler}>




                    <div className={styles.inputCards}>
                        <label>
                            LoanID
                        </label>
                        <input value={isData?.id} type='text' readOnly />
                    </div>

                    
                    <div className={styles.inputCards}>
                        <label>
                            Full Name
                        </label>
                        <input value={isData?.fullName} type='text' 
                            readOnly/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Email
                        </label>
                        <input value={isData?.email} type='text' 
                            readOnly/>
                    </div>

                    
                    <div className={styles.inputCards}>
                        <label>
                            Phone
                        </label>
                        <input value={isData?.phone} type='text' 
                            readOnly/>
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            status
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'status')}
                            value={isData?.status}
                        >
                            <option>
                                active

                            </option>
                            <option >
                                Pending
                            </option>

                        </select>


                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Date
                        </label>
                        <input value={isData.date} onChange={(e) => handleChangeHandler(e, 'date')} type='date' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Amount
                        </label>
                        <input value={isData.amount} onChange={(e) => handleChangeHandler(e, 'amount')} type='number' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Marital Status
                        </label>
                        <input value={isData.marital} onChange={(e) => handleChangeHandler(e, 'marital')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Occupation
                        </label>
                        <input value={isData.occupation} onChange={(e) => handleChangeHandler(e, 'occupation')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Address
                        </label>
                        <input value={isData.address} onChange={(e) => handleChangeHandler(e, 'address')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Income
                        </label>
                        <input value={isData.income} onChange={(e) => handleChangeHandler(e, 'income')} type='number' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Purpose
                        </label>
                        <input value={isData.purpose} onChange={(e) => handleChangeHandler(e, 'purpose')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Duration in month
                        </label>
                        <input value={isData.duration} onChange={(e) => handleChangeHandler(e, 'duration')} type='number' />
                    </div>




                    <div className={styles.buttonContainer} >
                        <button >Update</button>
                    </div>



                </form>}
            </div>






        </div></>)




}