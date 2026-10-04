import React, { useState,useEffect} from 'react';
import styles from './Home.module.css';
import { deleteUser, fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useDispatch, useSelector } from "react-redux";






export const SendEmailComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])
    let { color} = useSelector(state => state.userAuth)
    let dispatch = useDispatch()

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
        updateHandler(isData)
        return
    }


    useEffect(() => {
        fetchAllUsers()
    }, [])




    let fetchAllUsers = async () => {
        setIsError(false)
        let res = await dispatch(fetchUsers())

        console.log(res)

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here
        setUserList(res.message)
        setfilteredUsers(res.message)
        setIsLoading(false)
        setIsData(prev=>{
            prev.reciever = res.message[0].email
            return prev
        })
    }


   
    return (<>
        <div className={styles.homeScreen} >

            <div className={styles.timeline} >
                <form className={styles.editForm} onSubmit={submitHandler}>
                    <div className={styles.inputCards} >
                        <label>
                            Compose Email
                        </label>
                        <textarea onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type='text' style={{border:'1px solid grey',height:'200px',padding:'10px',borderRadius:'3px'}}></textarea>
                    </div>

                    



                    <div className={styles.inputCards} >
                        <label>
                        Enter Recipient
                        </label>
                       


                        <textarea onChange={(e) => handleChangeHandler(e, 'reciever')} value={isData.reciever}type='text' style={{border:'1px solid grey',height:'100px',padding:'10px',borderRadius:'3px'}}></textarea>
                    </div>

                    <div className={styles.buttonContainer} >
                        <button >send</button>

                    </div>
                </form>
            </div>






        </div></>)




}