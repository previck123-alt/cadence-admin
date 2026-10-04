import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminCardComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color, user } = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllUsers()
    }, [])




    let fetchAllUsers = async () => {
        setIsError(false)
        let res = await dispatch(fetchUsers())
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setUserList(res.message)
        setfilteredUsers(res.message)
        setIsLoading(false)
    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredUsers.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setUserList(newData)
            setIsLoading(false)
        } else {
            setUserList(filteredUsers)
            setIsLoading(false)

        }
    }


    let navigateHandler = (data)=>{
       //navigate to deposits table for this user
       navigate(`/cards/${data}`)
    }




   


    return (<>
    {isLoading&& <Loader/>}
    {isError && <Error />}
    
    <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
        <div className={styles.timeline} style={{ backgroundColor: color.background }}>


            <div className={styles.filter}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by email' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>
                </div>
            </div>
            <div className={styles.tableContainer} >

                {userList.length === 0 && <div className={styles.emptyContainer}>
                    <p>Empty</p>
                </div>}

                {userList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Email
                            </td>
                            <td>
                                First Name
                            </td>

                            <td>
                                Phone Number

                            </td>


                            <td>
                                Country

                            </td>

                        </tr>


                        {userList.map(data => <tr key={data.__id}  onClick={()=>navigateHandler(data._id)}>
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.firstName}

                            </td>

                            <td>
                                {data.phoneNumber}

                            </td>

                            <td>
                                {data.country}

                            </td>

                        </tr>)}


                    </tbody>
                </table>}




            </div>



        </div>
    </div></>)




}