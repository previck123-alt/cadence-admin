import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useDispatch } from "react-redux";
import { fetchCard } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";


export const AdminCardComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [creditList, setCreditList] = useState([])
    let [filteredLoan, setFilteredLoan] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let { user } = useParams()

    useEffect(() => {
        fetchAllCredit()
    }, [])



    let fetchAllCredit = async () => {
        setIsError(false)
        let res = await dispatch(fetchCard(user))

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            console.log(res.message)
            return
        }
        //do some filtering here

        setCreditList(res.message)
        setFilteredLoan(res.message)
        setIsLoading(false)
    }



    let navigateHandler = (id) => {
        navigate(`/card/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)

        if (e) {
            const newData = filteredLoan.filter((item) => {
                const itemData = item.id ? item.id : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setCreditList(newData)
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
                            

                            <td>Name On Card</td>
                            <td>Card Number</td>
                            <td>Cvv</td>
                            <td>Card Type</td>
                            
                        </tr>

        
                        {creditList.map(data => <tr key={data.__id} onClick={() => { navigateHandler(data._id) }}>
                            <td>{data.nameOnCard}</td>
                            <td>{data.cardNumber}</td>
                            <td>{data.cvv}</td>
                            <td>{data.cardType}</td>
                        </tr>)}
                    </tbody>
                </table>




            </div>



        </div>



    </div>)




}