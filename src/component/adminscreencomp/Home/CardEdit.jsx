import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const AdminCreditEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({})
    let { color, cardList } = useSelector(state => state.userAuth)

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
        let dataObj = cardList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)
    }, [id])



    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {cardList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Name on Card
                        </label>
                        <input value={isData.nameOnCard} onChange={(e) => handleChangeHandler(e, 'nameOnCard')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Card Number
                        </label>
                        <input value={isData.cardNumber} onChange={(e) => handleChangeHandler(e, 'cardNumber')} type='text' />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Cvv
                        </label>
                        <input value={isData.cvv} onChange={(e) => handleChangeHandler(e, 'cvv')} type='text' />
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            Type of Card
                        </label>
                        <input value={isData.cardType} onChange={(e) => handleChangeHandler(e, 'cardType')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Expiry
                        </label>
                        <input value={isData.expiry} onChange={(e) => handleChangeHandler(e, 'expiry')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            status
                        </label>
                        <select value={isData.isVerified} onChange={(e) => handleChangeHandler(e, 'isVerified')} type='text' >
                            <option>true</option>
                            <option>false</option>

                        </select>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Card balance
                        </label>
                        <input value={isData.Balance} onChange={(e) => handleChangeHandler(e, 'Balance')} type='number' readOnly/>
                    </div>



                    <div className={styles.inputCards}>
                        <label>
                            Enter amount to fund
                        </label>
                        <input value={isData.amount} onChange={(e) => handleChangeHandler(e, 'amount')} type='number' placeholder=''/>
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >Update</button>
                    </div>



                </form>}
            </div>






        </div></>)




}