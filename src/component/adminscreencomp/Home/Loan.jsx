import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useDispatch } from "react-redux";
import { fetchLoan } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminLoanComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [loanList, setLoanList] = useState([])
    let [filteredLoan, setFilteredLoan] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let { user } = useParams()

    useEffect(() => {
        fetchAllLoan()
    }, [])



    let fetchAllLoan = async () => {
        setIsError(false)
        let res = await dispatch(fetchLoan(user))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setLoanList(res.message)
        setFilteredLoan(res.message)
        setIsLoading(false)
    }



    let navigateHandler = (id) => {
        navigate(`/loan/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)

        if (e) {
            const newData = filteredLoan.filter((item) => {
                const itemData = item.id ? item.id : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setLoanList(newData)
            setIsLoading(false)
        } else {
            setFilteredLoan(filteredLoan)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>

            <div className={styles.filter}>

                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by ID' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>

            </div>

            <div className={styles.tableContainer} >

                <table>
                    <tbody>
                        <tr>
                    


                            <td>Loan ID</td>
                            <td>Email</td>
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Type Of Transaction</td>
                        </tr>

                
                        
                        {loanList.map(data => <tr key={data.__id} onClick={() => { navigateHandler(data._id) }}>
                            <td>{data.id}</td>
                            <td>{data.email}</td>
                            <td>{data.date}</td>
                            <td>${data.amount}</td>
                            <td>Loan</td>
                        </tr>)}


                    </tbody>
                </table>




            </div>



        </div>



    </div>)




}